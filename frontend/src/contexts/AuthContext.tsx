import React, { createContext, useContext, useEffect, useState } from "react";

import api from "../services/api";

import Cookies from "js-cookie";
import { JWT_COOKIE_NAME } from "../consts";
import { UserType } from "src/types";

type LoginInput = {
  email: string;
  password: string;
};

type AuthContextInterface = {
  token: string | null;
  isLoading: boolean;
  user: UserType | null;
  isAuthenticated: boolean;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextInterface);

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    async function main() {
      const jwt = Cookies.get(JWT_COOKIE_NAME);
      await updateUser(jwt ? jwt : null);
      setIsLoading(false);
    }
    main();
  }, []);

  async function updateUser(token: string | null) {
    api.changeClientBearerToken(token);
    const user = token ? await api.user.getMe() : null;
    setUser(user);
    setToken(token);
  }

  async function login(data: LoginInput) {
    setIsLoading(true);
    const { email, password } = data;

    const jwt = await api.user
      .login({
        email,
        password,
      })
      .catch((error) => {
        setIsLoading(false);
        throw error;
      });

    await updateUser(jwt);
    Cookies.set(JWT_COOKIE_NAME, jwt, {
      expires: 60 * 60 * 24 * 7, // 7 days
    });
    setIsLoading(false);
  }

  function logout() {
    updateUser(null);
    Cookies.remove(JWT_COOKIE_NAME);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

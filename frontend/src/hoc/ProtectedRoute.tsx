import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

function ProtectedRoute<T>(WrappedComponent: React.FC<T>) {
  const Protected: React.FC<T> = (props) => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) navigate("/login");
    }, [isAuthenticated, isLoading]);

    if (isLoading) return <></>;
    if (!isAuthenticated) return <></>;

    return <WrappedComponent {...props} />;
  };

  return Protected;
}

export default ProtectedRoute;

import { UserType } from "src/types";
import { client } from "./core";

interface LoginInput {
  email: string;
  password: string;
}

export async function login(data: LoginInput): Promise<string> {
  const { email, password } = data;

  const res = await client.post("/users/login", {
    email,
    password,
  });

  return res.data.jwt;
}

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export async function create(data: CreateUserInput) {
  const { name, email, password } = data;

  const res = await client.post("/users", {
    name,
    email,
    password,
  });

  return res.data;
}

export async function getMe(): Promise<UserType> {
  const res = await client.get("/users/me");

  return res.data;
}

export default {
  login,
  create,
  getMe,
};

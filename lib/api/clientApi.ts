import axios from "axios";
import { User } from "@/types/user";

const BASE_URL = "https://notehub-api.goit.study";

// REGISTER
export const register = async (data: { email: string; password: string }) => {
  const res = await axios.post<User>(`${BASE_URL}/auth/register`, data, {
    withCredentials: true,
  });
  return res.data;
};

// LOGIN
export const login = async (data: { email: string; password: string }) => {
  const res = await axios.post<User>(`${BASE_URL}/auth/login`, data, {
    withCredentials: true,
  });
  return res.data;
};

// SESSION
export const checkSession = async () => {
  const res = await axios.get<User | null>(`${BASE_URL}/auth/session`, {
    withCredentials: true,
  });
  return res.data;
};

// LOGOUT
export const logout = async () => {
  await axios.post(`${BASE_URL}/auth/logout`, null, {
    withCredentials: true,
  });
};
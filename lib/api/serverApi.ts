import axios from "axios";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const serverApi = axios.create({
  baseURL,
  withCredentials: true,
});
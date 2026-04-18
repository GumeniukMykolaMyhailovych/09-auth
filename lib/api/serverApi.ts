import { api } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note } from "@/types/note";

const getHeaders = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  return {
    Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
  };
};

export const fetchNotes = async (params: {
  page?: number;
  search?: string;
  tag?: string;
}) => {
  const res = await api.get<{ notes: Note[]; totalPages: number }>("/notes", {
    params,
    headers: await getHeaders(),
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: await getHeaders(),
  });
  return res.data;
};

export const getMe = async () => {
  const res = await api.get<User>("/users/me", {
    headers: await getHeaders(),
  });
  return res.data;
};
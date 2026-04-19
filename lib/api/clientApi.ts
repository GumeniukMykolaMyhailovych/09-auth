import { api } from "@/app/api/api";
import { User } from "@/types/user";
import { Note } from "@/types/note";



export const register = async (data: { email: string; password: string }) => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const res = await api.get<User | null>("/auth/session");
  return res.data;
};

export const getMe = async () => {
  const res = await api.get<User>("/users/me");
  return res.data;
};



export const fetchNotes = async (params: {
  page?: number;
  search?: string;
  tag?: string;
}) => {
  const res = await api.get<{ notes: Note[]; totalPages: number }>("/notes", {
    params,
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag?: string;
}) => {
  const res = await api.post<Note>("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};

// USER

export const updateUser = async (data: { username: string }) => {
  const res = await api.patch<User>("/users/me", data);
  return res.data;
};
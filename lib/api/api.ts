import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

// 🔹 Отримати одну нотатку
export const fetchNoteById = async (id: string) => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};

// 🔹 Створити нотатку
export const createNote = async (data: {
  title: string;
  content: string;
  tag?: string;
}) => {
  const res = await api.post("/notes", data);
  return res.data;
};

// 🔹 (опціонально, але часто використовується — краще додати)
export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};
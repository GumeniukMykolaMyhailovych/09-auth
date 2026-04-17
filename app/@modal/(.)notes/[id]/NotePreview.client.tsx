"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/api";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading)
    return <Modal onClose={() => router.back()}>Loading...</Modal>;

  if (error instanceof Error)
    return <Modal onClose={() => router.back()}>{error.message}</Modal>;

  if (!data) return null;

  return (
    <Modal onClose={() => router.back()}>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>{data.tag}</p>
      <p>{new Date(data.createdAt).toLocaleString()}</p>
    </Modal>
  );
}
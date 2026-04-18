"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/api";
import styles from "@/styles/NoteDetails.module.css";

type Props = {
  id: string;
};

export default function NoteDetailsClient({ id }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) return <p>No data</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{data.title}</h2>

      {data.tag && <p className={styles.tag}>{data.tag}</p>}

      <p className={styles.content}>{data.content}</p>

      <p className={styles.date}>
        {new Date(data.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchNotes } from "@/lib/api/clientApi";
import styles from "../../../../styles/NotesPage.module.css";
import Link from "next/link";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

export default function NotesClient({ tag }: { tag: string }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const normalizedTag = tag === "all" ? undefined : tag;

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, normalizedTag, debouncedSearch],
    queryFn: () => fetchNotes(page, normalizedTag, debouncedSearch),
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <>
      <h1>Notes</h1>

      <div className={styles.toolbar}>
        <SearchBox onChange={setSearch} />

        <Link href="/notes/action/create">
          <button>Add note</button>
        </Link>
      </div>

      {/* 🔥 ВИПРАВЛЕННЯ ТУТ */}
      {data?.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      <Pagination
        page={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />
    </>
  );
}
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";
import type { Metadata } from "next"; // 🔥 ДОДАЛИ

export const metadata: Metadata = {
  title: "Create note",
  description: "Create a new note in NoteHub",
  openGraph: {
    title: "Create note",
    description: "Create a new note in NoteHub",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>

        <NoteForm />
      </div>
    </main>
  );
}
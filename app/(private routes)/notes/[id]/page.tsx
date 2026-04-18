import { fetchNoteById } from "@/lib/api/api";
import type { Metadata } from "next"; // 🔥 ДОДАЛИ

type Props = {
  params: {
    id: string;
  };
};

export default async function NoteDetailsPage({ params }: Props) {
  const note = await fetchNoteById(params.id);

  return (
    <div>
      <h1>Note Details</h1>
      <p>
        <strong>ID:</strong> {params.id}
      </p>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}

// 🔥 ДОДАЛИ ТИП ПОВЕРНЕННЯ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `https://notehub.com/notes/${params.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}
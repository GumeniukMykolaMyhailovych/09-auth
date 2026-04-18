import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import NotesClient from "./Notes.client";
import type { Metadata } from "next"; // 🔥 ДОДАЛИ

type Props = {
  params: {
    slug?: string[];
  };
};

export default async function Page({ params }: Props) {
  const slug = params.slug;

  const tag = slug?.[0] ?? "all";
  const normalizedTag = tag === "all" ? undefined : tag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, normalizedTag, ""],
    queryFn: () =>
  fetchNotes({
    page: 1,
    tag: normalizedTag,
    search: "",
  }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

// 🔥 ТИП ПОВЕРНЕННЯ ДОДАЛИ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug?.[0] || "All";

  return {
    title: `Notes - ${tag}`,
    description: `Viewing notes filtered by ${tag}`,
    openGraph: {
      title: `Notes - ${tag}`,
      description: `Viewing notes filtered by ${tag}`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}
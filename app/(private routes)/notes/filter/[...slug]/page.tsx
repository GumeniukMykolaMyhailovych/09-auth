import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug?.[0] || "All";

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
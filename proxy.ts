import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchNotes } from "./lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  const isPrivatePage =
    request.nextUrl.pathname.startsWith("/notes") ||
    request.nextUrl.pathname.startsWith("/profile");

  if (!accessToken && !refreshToken && isPrivatePage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if ((accessToken || refreshToken) && isAuthPage) {
    return NextResponse.redirect(new URL("/notes", request.url));
  }

  if (refreshToken && !accessToken) {
    try {
      await fetchNotes({ page: 1 });
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}
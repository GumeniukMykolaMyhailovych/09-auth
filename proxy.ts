import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./lib/api/serverApi";
import { isAxiosError } from "axios";

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
      const res = await checkSession();

      const response = NextResponse.next();

      const setCookie = res.headers["set-cookie"];

      if (setCookie) {
        response.headers.set("set-cookie", setCookie);
      }

      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      }

      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../../lib/api/api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await api.post("auth/login", body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      if (Array.isArray(setCookie)) {
        setCookie.forEach((cookie) => {
          cookieStore.set(cookie);
        });
      } else {
        cookieStore.set(setCookie);
      }
    }

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data,
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
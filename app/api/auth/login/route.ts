import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../../lib/api/api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await api.post("auth/login", body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      cookieArray.forEach((cookieStr) => {
        const parsed = parse(cookieStr);

        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken);
        }

        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken);
        }
      });
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
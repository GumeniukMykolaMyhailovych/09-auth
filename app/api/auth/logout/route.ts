import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../../../lib/api/api";
import { isAxiosError } from "axios";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    await api.post("auth/logout", null, {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return NextResponse.json({ message: "Logged out successfully" });
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
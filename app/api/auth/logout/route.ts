import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../../../lib/api/api";
import { isAxiosError } from "axios";

function logErrorResponse(error: unknown) {
  if (isAxiosError(error)) {
    console.log(error.response?.data);
    return {
      message: error.response?.data?.message || "Request failed",
      status: error.response?.status || 500,
    };
  }

  return { message: "Unexpected error", status: 500 };
}

export async function POST() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  try {
    await api.post("auth/logout", null, {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    const { message, status } = logErrorResponse(error);

    return NextResponse.json({ message }, { status });
  }
}
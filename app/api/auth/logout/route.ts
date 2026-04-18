import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../../../lib/api/api';
import { isAxiosError } from 'axios';

export async function POST() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  try {
    await api.post('auth/logout', null, {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }

    return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
  }
}
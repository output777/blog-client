import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      // 응답 실패 처리
      const res = new NextResponse('Authentication failed', {status: response.status});
      return res;
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

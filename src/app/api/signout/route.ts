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
    // router.replace('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }

  // const refreshToken = await request.json();

  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signout`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   credentials: 'include',
  //   body: JSON.stringify(refreshToken),
  // });

  // if (!response.ok) {
  //   // 응답 실패 처리
  //   const res = new NextResponse('Authentication failed', {status: response.status});
  //   return res;
  // }

  // const result = await response.json();
  // // 로직에 따라 결과 처리
  // return new NextResponse(JSON.stringify(result), {
  //   status: 200,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
}

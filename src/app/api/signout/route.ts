import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
  const refreshToken = await request.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(refreshToken),
  });

  if (!response.ok) {
    // 응답 실패 처리
    console.log('response.status', response.status);
    const res = new NextResponse('Authentication failed', {status: response.status});
    return res;
  }

  const result = await response.json();
  console.log('result', result);
  // 로직에 따라 결과 처리
  return new NextResponse(JSON.stringify(result), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

import {auth} from '@/auth';

export async function POST(request: Request) {
  const session = await auth();
  const json = await request.json();

  try {
    const data = {
      email: session?.user?.email,
      categoryName: json?.category,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`createCategory API 호출 오류: ${response.status} - ${errorData}`);
    }
    const jsonResult = await response.json();
    return Response.json(jsonResult);
  } catch (err) {
    console.error('createCategory 호출 중 오류 발생:', err);
    // 에러 상황에 대한 Response 처리
    // return new Response(JSON.stringify({error: 'createCategory 서버 에러 발생'}), {
    //   status: 500,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  }
}

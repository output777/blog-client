import {auth} from '@/auth';

export async function PUT(request: Request) {
  const session = await auth();
  const json = await request.json();
  console.log("json", json);

  try {
    const data = {
      nickname: session?.user?.name,
      newCategoryName: json?.newCategoryName,
      categoryId:  json?.categoryId,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/category`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`updateCategory API 호출 오류: ${response.status} - ${errorData}`);
    }
    const jsonResult = await response.json();
    return Response.json(jsonResult);
  } catch (err) {
    console.error('updateCategory 호출 중 오류 발생:', err);
  }
}

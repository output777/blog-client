export async function GET(request: Request) {
  const url = new URL(request.url);
  const nickname = url.searchParams.get('nickname');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/categories?nickname=${nickname}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.text();
      if (response.status === 404) {
        return new Response(JSON.stringify({ categories: [], message: 'Category not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`getCategory API 호출 오류: ${response.status} - ${errorData}`);
    }
    const jsonResult = await response.json();
    return Response.json(jsonResult);
  } catch (err) {
    console.error('getCategory 호출 중 오류 발생:', err);
  }
}

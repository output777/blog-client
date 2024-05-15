export async function GET(request: Request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/post/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`getPost API 호출 오류: ${response.status} - ${errorData}`);
    }
    const jsonResult = await response.json();
    return Response.json(jsonResult);
  } catch (err) {
    console.error('getPost 호출 중 오류 발생:', err);
    // 에러 상황에 대한 Response 처리
    return new Response(JSON.stringify({error: 'getPost 서버 에러 발생'}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

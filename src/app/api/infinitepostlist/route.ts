export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const page = searchParams.get('page');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/infinitePosts?page=${page}&limit=4`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`infinitePosts API 호출 오류: ${response.status} - ${errorData}`);
      }
      const jsonResult = await response.json();
      return Response.json({
        items: jsonResult.items,
        nextCursor: jsonResult.nextPage,
      });
    } catch (err) {
      console.error('infinitePosts 호출 중 오류 발생:', err);
    }
  }
  
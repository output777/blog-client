export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('categoryId');
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/category/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`deleteCategory API 호출 오류: ${response.status} - ${errorData}`);
      }
      const jsonResult = await response.json();
      return Response.json(jsonResult);
    } catch (err) {
      console.error('deleteCategory 호출 중 오류 발생:', err);
    }
  }
  
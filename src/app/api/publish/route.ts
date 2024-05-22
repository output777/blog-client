export async function POST(request: Request) {
  const formData = await request.formData();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/post`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`publish API 호출 오류: ${response.status} - ${errorData}`);
    }
    const jsonResult = await response.json();
    return Response.json(jsonResult);
  } catch (err) {
    console.error('publish 호출 중 오류 발생:', err);
  }
}

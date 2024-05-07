import PostsPagination from '@/_components/PostsPagination';
import {auth} from '@/auth';

export default async function CategoryPage() {
  const session = await auth();

  return <PostsPagination nickname={session?.user?.name} />;
}

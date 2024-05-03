import {auth} from '@/auth';
import PostsPagination from '@/_components/PostsPagination';

export default async function CategoryPage() {
  const session = await auth();

  return <PostsPagination nickname={session?.user?.name} />;
}

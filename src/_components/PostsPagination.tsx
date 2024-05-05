'use client';
import {useBlogStore} from '@/app/_store/blogStore';
import {useQuery} from '@tanstack/react-query';
import Link from 'next/link';
import {useRouter, useSearchParams, useParams} from 'next/navigation';
import styles from './postPagination.module.css';
import Image from 'next/image';
import Pagination from './Pagination';
import TextContent from './TextContent';

interface FetchPostsProps {
  blogId: number | null;
  page: number;
  categoryId: string;
}

interface PostsPaginationProps {
  nickname: string | null | undefined;
}

export interface PostProps {
  blog_id: number;
  category_id: number;
  category_name: string;
  content: string;
  del_tm: string | null;
  image_url: string;
  is_public: string;
  post_id: number;
  reg_tm: string;
  title: string;
  upd_tm: string;
  user_id: number;
  views: number;
}

interface DataProps {
  pagination: {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalPosts: number;
  };
  posts: PostProps[];
}

async function getPosts({blogId, page, categoryId = ''}: FetchPostsProps) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/posts?blogId=${blogId}&categoryId=${categoryId}&page=${page}&limit=8`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('데이터를 불러오는데 실패했습니다.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default function PostsPagination({nickname}: PostsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const {blogValue} = useBlogStore();
  const categoryId = params.categoryid || '';

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const {data, isLoading} = useQuery<DataProps>({
    queryKey: ['posts', currentPage],
    queryFn: async () => {
      const fetchData = {
        blogId: blogValue.blogId,
        page: currentPage,
        categoryId: categoryId as string,
      };
      return await getPosts(fetchData);
    },
    enabled: !!blogValue.blogId,
  });

  const pageHandler = (page: string) => {
    const isCategory = !!categoryId ? `/category/${categoryId}` : '';
    router.push(`/blog/${nickname}${isCategory}?page=${page}`);
  };

  const totalPages = data?.pagination.totalPages as number;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data?.posts.length === 0 ? (
        <div className={styles.container}>
          <p>
            <span>{nickname}</span>님 포스팅이 없습니다.
          </p>
          <Link href={`/blog/${nickname}/write`} className={styles.writeBtn}>
            글쓰기
          </Link>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.postsContainer}>
            {data?.posts.map((post: PostProps) => {
              return (
                <Link
                  href={`/blog/${nickname}/category/${post.category_id}/post/${post.post_id}`}
                  key={post.post_id}
                  className={styles.post}
                >
                  <div className={styles.imageContainer}>
                    <Image
                      className={styles.image}
                      src={
                        !!post.image_url
                          ? `${post.image_url}`
                          : `https://via.placeholder.com/100x100`
                      }
                      alt="img"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className={styles.infoCotainer}>
                    <div className={styles.category}>{post.category_name}</div>
                    <div className={styles.title}>{post.title}</div>
                    <div className={styles.content}>
                      <TextContent content={post.content} />
                    </div>
                    <div className={styles.infoBox}>
                      <div className={styles.info}>
                        <div>{nickname}</div>
                        <div>{post.reg_tm.split('T')[0]}</div>
                      </div>
                      <div className={styles.isPublic}>{post.is_public ? '공개' : '비공개'}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {data?.posts.length === 0 ? null : (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              pageHandler={pageHandler}
            />
          )}
        </div>
      )}
    </>
  );
}

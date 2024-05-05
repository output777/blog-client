'use client';
import {useInfiniteQuery} from '@tanstack/react-query';
import React, {useEffect, useRef} from 'react';
import TextContent from './TextContent';
import styles from './postInfiniteScroll.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface PostProps {
  blog_id: number;
  category_id: number;
  category_name: string;
  content: string;
  image_url: string;
  is_public: string;
  nickname: string;
  post_id: number;
  reg_tm: string;
  title: string;
  upd_tm: string;
  user_id: number;
  views: number;
}

interface PageData {
  items: PostProps[];
  nextCursor?: number | null;
}

interface PostsInfiniteScrollProps {
  pageParams: number[];
  pages: PageData[];
}

async function getInfinitePosts(pageParam = 1): Promise<PageData | undefined> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/infinitePosts?page=${pageParam}&limit=3`,
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
    console.log('result', result);
    return {
      items: result.items,
      nextCursor: result.nextPage,
    };
  } catch (err) {
    console.error(err);
  }
}

export default function PostsInfiniteScroll() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useInfiniteQuery({
    queryKey: ['infinite'],
    queryFn: async ({pageParam}) => await getInfinitePosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log('lastPage', lastPage);
      console.log('allPages', allPages);
      // 마지막 페이지에서 다음 페이지 번호를 결정
      return lastPage?.nextCursor;
    },
  });

  console.log('data>>>', data);
  // console.log('fetchNextPage', fetchNextPage);
  // console.log('hasNextPage', hasNextPage());
  // console.log('isFetchingNextPage', isFetchingNextPage);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('entries', entries, entries[0]);
        console.log('hasNextPage', hasNextPage);
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {threshold: 1.0}
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  if (status === 'pending') {
    return <div>Loading...</div>;
  }
  if (status === 'error') {
    return <div>Error loading data</div>;
  }

  return (
    <div className={styles.container}>
      {data.pages?.map((page: any) => {
        console.log('page!!!', page);
        return page?.items.map((item: any) => {
          console.log('item!!!', item);
          return (
            <div className={styles.infinitePostContainer} key={item.post_id}>
              <Link
                href={`/blog/${item.nickname}/category/${item.category_id}/post/${item.post_id}`}
                className={styles.infinitePost}
              >
                <div className={styles.imageContainer}>
                  <Image
                    className={styles.image}
                    src={item.image_url}
                    alt="img"
                    width={360}
                    height={360}
                  />
                </div>
                <div className={styles.infoCotainer}>
                  <div className={styles.category}>{item.category_name}</div>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.content}>
                    <TextContent content={item.content as string} />
                  </div>
                  <div className={styles.infoBox}>
                    <div className={styles.info}>
                      <div>{item.nickname}</div>
                      <div>{item.reg_tm.split('T')[0]}</div>
                    </div>
                    <div className={styles.isPublic}>
                      {item.is_public === 'Y' ? '공개' : '비공개'}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        });
      })}

      <div ref={loadMoreRef} style={{height: '20px', visibility: 'hidden'}}></div>
    </div>
  );
}

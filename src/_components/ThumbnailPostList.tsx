'use client';

import React, {useEffect, useRef, useState} from 'react';
import styles from './styles/thumbnailPostList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {useSearchParams} from 'next/navigation';
import Pagination from './Pagination';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {timeAgo} from '@/app/_lib/time';
import stripHtmlTags from '@/app/_lib/strip';
import {useCategoryIdStore} from '@/app/_store/categoryIdStore';

interface ThumbnailPost {
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
  items: ThumbnailPost[];
  nextCursor?: number | null;
}

// TODO content 태그 없애기
export default function ThumbnailPostList() {
  // const params = useSearchParams();
  const {setCategoryId} = useCategoryIdStore();


  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isFetching} =
  useInfiniteQuery({
    queryKey: ['infinite'],
    queryFn: async ({pageParam = 1}) => {
      const response = await fetch(`/api/infinitepostlist?page=${pageParam}`)
      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다');
      }
      return await response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지에서 다음 페이지 번호를 결정
      return lastPage?.nextCursor;
    },
  });

  useEffect(() => {
    setCategoryId('');
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {threshold: 0.5}
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  if(!isFetching && data?.pages?.length === 0) {
    return (<div className={styles.content}>
      <span className={styles.no_posts}>작성된 포스팅이 없습니다</span></div>)
  }

  return (
    <div className={styles.content}>
      <div className={styles.list_post_article}>
        {data?.pages?.map((page: PageData, index: number) => {
          return page?.items?.map((item: ThumbnailPost) => (
          <div key={item.post_id} className={styles.item}>
            <div className={styles.info_post}>
              <Link href={`/blog/${item?.nickname}`}>
                <div className={styles.info_author}>
                  <em className={styles.name_author}>{item?.nickname}</em>
                  <span className={styles.time}>{timeAgo(item?.reg_tm)}</span>
                </div>
              </Link>
              <div className={styles.desc}>
                <Link href={`/blog/${item?.nickname}/post/${item?.post_id}`}>
                  <strong className={styles.title_post}>{item?.title}</strong>
                </Link>
                <Link href={`/blog/${item?.nickname}/post/${item?.post_id}`}>
                  <p className={styles.text}>{stripHtmlTags(item?.content)}</p>
                </Link>
              </div>
            </div>
            <Link
              className={styles.thumbnail_post}
              href={`/blog/${item?.nickname}/post/${item?.post_id}`}
            >
              <Image
                src={item?.image_url || 'https://via.placeholder.com/240'}
                alt="thumbnail_post_image"
                className={styles.thumbnail_post_image}
                width={167}
                height={167}
              />
            </Link>
          </div>
          ))
        })}
        <div
          ref={loadMoreRef}
          style={{height: '100px', background: '#fff', visibility: 'hidden'}}
        >
        </div>
      </div>
    </div>
  );
}

'use client';

import React, {useState} from 'react';
import styles from './styles/thumbnailPostList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {useSearchParams} from 'next/navigation';
import Pagination from './Pagination';
import {useQuery} from '@tanstack/react-query';
import {timeAgo} from '@/app/_lib/time';
import ContentComponent from './ContentComponent';

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

// TODO content 태그 없애기
// data paginaiton currentPage가 null인거 수정하기
export default function ThumbnailPostList() {
  const params = useSearchParams();
  const [limitPage, setLimitPage] = useState(5);
  const [startPage, setStartPage] = useState(1);

  const {data, isFetching} = useQuery({
    queryKey: [params.get('page')],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/postlist?page=${params.get('page')}`);
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if (data?.pagination?.currentPage > limitPage) {
          setLimitPage((prev) => prev + 5);
          setStartPage((prev) => prev + 5);
        }
        return data;
      } catch (err) {
        console.error('Error fetching posts:', err);
        throw new Error('Failed to fetch data');
      }
    },
  });

  return (
    <div className={styles.content}>
      <div className={styles.list_post_article}>
        {data?.posts?.map((post: ThumbnailPost, index: number) => (
          <div key={index} className={styles.item}>
            <div className={styles.info_post}>
              <Link href={`/blog/${post?.nickname}`}>
                <div className={styles.info_author}>
                  <em className={styles.name_author}>{post?.nickname}</em>
                  <span className={styles.time}>{timeAgo(post?.reg_tm)}</span>
                </div>
              </Link>
              <div className={styles.desc}>
                <Link href={`/blog/${post?.nickname}/post/${post?.post_id}`}>
                  <strong className={styles.title_post}>{post?.title}</strong>
                </Link>
                <Link href={`/blog/${post?.nickname}/post/${post?.post_id}`}>
                  <p className={styles.text}>
                    <ContentComponent content={post?.content} />
                  </p>
                </Link>
              </div>
            </div>
            <Link
              className={styles.thumbnail_post}
              href={`/blog/${post?.nickname}/post/${post?.post_id}`}
            >
              <Image
                src={post?.image_url || 'https://via.placeholder.com/240'}
                alt="thumbnail_post_image"
                className={styles.thumbnail_post_image}
                width={167}
                height={167}
              />
            </Link>
          </div>
        ))}
      </div>
      {isFetching ? null : (
        <Pagination
          totalPages={data?.pagination?.totalPages}
          limitPage={limitPage}
          startPage={startPage}
          currentPage={params.get('page')}
        />
      )}
    </div>
  );
}

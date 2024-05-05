'use client';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import styles from './topPost.module.css';
import Link from 'next/link';
import Image from 'next/image';
import TextContent from './TextContent';

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

async function getTopPost() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/topPost`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('데이터를 불러오는데 실패했습니다.');
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}

export default function TopPost() {
  const {data, isLoading} = useQuery<PostProps>({
    queryKey: ['topPost'],
    queryFn: getTopPost,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.backgroundBox}>
        <div>Blog</div>
        {/* <div className={styles.searchBox}>
          <input className={styles.searchInput} type="text" placeholder="Search" />
        </div> */}
      </div>
      <div className={styles.topPostContainer}>
        <Link
          href={`/blog/${data?.nickname}/category/${data?.category_id}/post/${data?.post_id}`}
          className={styles.topPost}
        >
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src={data?.image_url as string}
              alt="img"
              width={360}
              height={360}
            />
          </div>
          <div className={styles.infoCotainer}>
            <div className={styles.category}>{data?.category_name}</div>
            <div className={styles.title}>{data?.title}</div>
            <div className={styles.content}>
              <TextContent content={data?.content as string} />
            </div>
            <div className={styles.infoBox}>
              <div className={styles.info}>
                <div>{data?.nickname}</div>
                <div>{data?.reg_tm.split('T')[0]}</div>
              </div>
              <div className={styles.isPublic}>{data?.is_public === 'Y' ? '공개' : '비공개'}</div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

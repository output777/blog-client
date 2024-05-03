import React from 'react';
import styles from './page.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import TextContent from '@/_components/TextContent';
import PostsInfiniteScroll from '@/_components/PostsInfiniteScroll';

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

export default async function BlogPage() {
  const response: PostProps = await getTopPost();

  return (
    <div className={styles.container}>
      <div className={styles.backgroundBox}>
        <div>Blog</div>
        {/* <div className={styles.searchBox}>
          <input className={styles.searchInput} type="text" placeholder="Search" />
        </div> */}
      </div>
      <div className={styles.topPostContainer}>
        <Link
          href={`/blog/${response.nickname}/category/${response.category_id}/post/${response.post_id}`}
          className={styles.topPost}
        >
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src={response.image_url}
              alt="img"
              layout="fill"
              objectFit="contain"
              objectPosition="top center"
            />
          </div>
          <div className={styles.infoCotainer}>
            <div className={styles.category}>{response.category_name}</div>
            <div className={styles.title}>{response.title}</div>
            <div className={styles.content}>
              <TextContent content={response.content as string} />
            </div>
            <div className={styles.infoBox}>
              <div className={styles.info}>
                <div>{response.nickname}</div>
                <div>{response.reg_tm.split('T')[0]}</div>
              </div>
              <div className={styles.isPublic}>
                {response.is_public === 'Y' ? '공개' : '비공개'}
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.infinitePostContainer}>
        <PostsInfiniteScroll />
      </div>
    </div>
  );
}

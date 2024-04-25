import React from 'react';
import {auth} from '@/auth';
import Link from 'next/link';
import styles from './page.module.scss';
import Image from 'next/image';

interface PostsProps {
  post_id: number;
  title: string;
  content: string;
  reg_tm: string;
  upd_tm: string;
  del_tm: null | string;
  category_id: number;
}

export default async function Page() {
  let posts = [];
  const session = await auth();
  console.log('session123', session);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/all-posts?email=${session?.user?.email}`,
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
    posts = result.posts;
  } catch (error) {
    console.error(error);
  }

  console.log('posts', posts, posts.length);

  return (
    <>
      {posts.length === 0 ? (
        <div className={styles.container}>
          <p>
            <span>{session?.user?.name}</span>님 첫 포스팅을 작성해보세요
          </p>
          <Link href={`/blog/${session?.user?.name}/write`} className={styles.writeBtn}>
            글쓰기
          </Link>
        </div>
      ) : (
        <div className={styles.postsContainer}>
          {posts.map((post: any) => {
            console.log('post', post);
            return (
              <div key={post.post_id} className={styles.post}>
                <div className={styles.imageContainer}>
                  <Image
                    className={styles.image}
                    src={
                      !!post.image_url ? `${post.image_url}` : `https://via.placeholder.com/360x250`
                    }
                    alt="img"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <div className={styles.infoCotainer}>
                  <div className={styles.category}>{post.category_name}</div>
                  <div className={styles.title}>{post.title}</div>
                  <div className={styles.infoBox}>
                    <div className={styles.info}>
                      <div>{session?.user?.name}</div>
                      <div>{post.reg_tm.split('T')[0]}</div>
                    </div>
                    <div className={styles.isPublic}>{post.is_public ? '공개' : '비공개'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

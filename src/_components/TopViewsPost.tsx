import React from 'react';
import styles from './styles/topViews.module.css';
import Link from 'next/link';
import Image from 'next/image';
import stripHtmlTags from '@/app/_lib/strip';

// TODO post.image_url || '' 수정,
type TopViewsPostsProps = {topViewsPosts: any};
export default function TopViewsPost({topViewsPosts}: TopViewsPostsProps) {
  return (
    <div className={styles.list_group}>
      <div className={styles.list_topviews}>
        {topViewsPosts?.items?.map((post: any) => (
          <div className={styles.item_wrap} key={post.post_id}>
            <div className={styles.item}>
              <Link href={`/blog/${post.nickname}/post/${post.post_id}`}>
                <Image
                  src={post.image_url || 'https://via.placeholder.com/240'}
                  alt="post image"
                  className={styles.bg_image}
                  width={252}
                  height={240}
                />
                <div className={styles.desc_post}>
                  <div className={styles.title_inner}>
                    <span className={styles.title}>{post.title}</span>
                  </div>
                  <div className={styles.content_inner}>
                    <div className={styles.content}>
                      <span className={styles.nickname}>{post.nickname}</span>
                      <p className={styles.text_post}>{stripHtmlTags(post.content)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

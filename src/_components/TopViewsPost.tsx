import React, {Suspense} from 'react';
import styles from './styles/topViews.module.css';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const DynamicContentComponent = dynamic(() => import('../_components/ContentComponent'), {
  ssr: false,
});

// TODO thumbnail_author, post.image_url || '', {post.content} 태그지우기 수정,
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
                      <p className={styles.text_post}>
                        <Suspense fallback={<div></div>}>
                          <DynamicContentComponent content={post.content} />
                        </Suspense>
                      </p>
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

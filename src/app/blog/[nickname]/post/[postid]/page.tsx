import React, {Suspense} from 'react';
import styles from '@/app/_styles/post.module.css';
import BlogHeader from '@/_components/BlogHeader';
import dynamic from 'next/dynamic';

const DynamicBlogTitle = dynamic(() => import('@/_components/BlogTitle'), {ssr: false});
const DynamicBlogCategory = dynamic(() => import('@/_components/BlogCategory'), {ssr: false});
const DynamicBlogPost = dynamic(() => import('@/_components/BlogPost'), {ssr: false});

export default function PostPage() {
  return (
    <div className={styles.blog_container}>
      <div className={styles.blog_wrap}>
        <BlogHeader />
        <Suspense fallback={<div></div>}>
          <DynamicBlogTitle />
          <div className={styles.blog_content}>
            <DynamicBlogCategory />
            <DynamicBlogPost />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

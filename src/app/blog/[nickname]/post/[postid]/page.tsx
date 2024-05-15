import React from 'react';
import styles from '@/app/_styles/post.module.css';
import BlogHeader from '@/_components/BlogHeader';
import BlogTitle from '@/_components/BlogTitle';
import BlogCategory from '@/_components/BlogCategory';
import BlogPost from '@/_components/BlogPost';

export default function PostPage() {
  return (
    <div className={styles.blog_container}>
      <div className={styles.blog_wrap}>
        <BlogHeader />
        <BlogTitle />
        <div className={styles.blog_content}>
          <BlogCategory />
          <BlogPost />
        </div>
      </div>
    </div>
  );
}

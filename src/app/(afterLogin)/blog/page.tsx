import React from 'react';
import styles from './page.module.css';
import PostsInfiniteScroll from '@/_components/PostsInfiniteScroll';
import TopPost from '@/_components/TopPost';

export default async function BlogPage() {
  return (
    <div className={styles.container}>
      <TopPost />
      <div className={styles.infinitePostContainer}>
        <PostsInfiniteScroll />
      </div>
    </div>
  );
}

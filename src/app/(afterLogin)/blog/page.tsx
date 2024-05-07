import React from 'react';
import styles from './page.module.css';
import PostsInfiniteScroll from '@/_components/PostsInfiniteScroll';

export default async function BlogPage() {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundBox}>
        <div>HiBlog</div>
        {/* <div className={styles.searchBox}>
          <input className={styles.searchInput} type="text" placeholder="Search" />
        </div> */}
      </div>
      <div className={styles.infinitePostContainer}>
        <PostsInfiniteScroll />
      </div>
    </div>
  );
}

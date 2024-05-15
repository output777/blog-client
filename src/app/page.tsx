import React from 'react';
import styles from '@/app/_styles/page.module.css';
import Header from '@/_components/Header';
import TopViews from '@/_components/TopViews';
import ThumbnailPostList from '@/_components/ThumbnailPostList';
import {auth} from '@/auth';
import Aside from '@/_components/Aside';

export default async function Page() {
  const session = await auth();
  return (
    <div className={styles.container}>
      <Header session={session} />
      <TopViews />
      <div className={styles.layout_content}>
        <ThumbnailPostList />
        <Aside session={session} />
      </div>
    </div>
  );
}

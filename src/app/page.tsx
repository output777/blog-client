import React, {Suspense} from 'react';
import styles from '@/app/_styles/page.module.css';
import Header from '@/_components/Header';
import TopViews from '@/_components/TopViews';
import {auth} from '@/auth';
import Aside from '@/_components/Aside';
import dynamic from 'next/dynamic';
const DynamicThumbnailPostList = dynamic(() => import('@/_components/ThumbnailPostList'), {
  ssr: false,
  loading: () => <div></div>,
});

export default async function Page() {
  const session = await auth();
  return (
    <div className={styles.container}>
      <Header session={session} />
      <TopViews />
      <div className={styles.layout_content}>
        <Suspense fallback={<div></div>}>
          <DynamicThumbnailPostList />
        </Suspense>
        <Aside session={session} />
      </div>
    </div>
  );
}

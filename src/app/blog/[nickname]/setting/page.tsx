import React from 'react';
import styles from '@/app/_styles/setting.module.css';
import Link from 'next/link';
import {auth} from '@/auth';
import SettingContent from '@/_components/SettingContent';

export default async function SettingPage() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.blog_header_wrap}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Link href={'/'}>
              <span>H</span> Blog
            </Link>
          </div>
          <div className={styles.header_menu}>
            <Link href={`/`}>홈</Link>
            <Link href={`/blog/${session?.user?.name}`}>내블로그</Link>
          </div>
        </div>
      </div>
      <SettingContent />
    </div>
  );
}

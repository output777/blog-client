import React from 'react';
import styles from './styles/blogHeader.module.css';
import Link from 'next/link';
import {auth} from '@/auth';

export default async function BlogHeader() {
  const session = await auth();
  return (
    <div className={styles.header}>
      <div className={styles.area_logo}>
        <Link href="/" className={styles.logo_hiblog_logo}>
          <span>H</span> blog
        </Link>
      </div>
      <div className={styles.header_menu}>
        <Link href={`/`}>블로그 홈</Link>
        {session ? (
          <>
            <Link href={`/blog/${session?.user?.name}`}>내블로그</Link>
            <Link href={`/blog/${session?.user?.name}/setting`}>관리</Link>
          </>
        ) : (
          <>
            <Link href={`/signin`}>로그인</Link>
            <Link href={`/signup`}>회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
}

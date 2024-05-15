import React from 'react';
import styles from './styles/blogHeader.module.css';
import Link from 'next/link';
import {auth} from '@/auth';

export default async function BlogHeader() {
  const session = await auth();
  return (
    <div className={styles.header}>
      <div className={styles.header_menu}>
        <Link href={`/blog/${session?.user?.name}`}>내블로그</Link>
        <Link href={`/`}>블로그 홈</Link>
        <Link href={`/blog/${session?.user?.name}/setting`}>관리</Link>
      </div>
    </div>
  );
}

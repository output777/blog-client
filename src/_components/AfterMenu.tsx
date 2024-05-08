import React from 'react';
import styles from './afterMenu.module.css';
import Link from 'next/link';
import SignoutButton from '@/app/(afterLogin)/_component/SignoutButton';

type Props = {nickname?: string | null; email?: string | null};
export default function AtferMenu({nickname, email}: Props) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/blog">
            <span>Hi</span>Blog
          </Link>
        </div>
        <div className={styles.menuContainer}>
          <nav className={styles.nav}>
            <div className={styles.icon}>
              <Link href="/blog">
                <span>블로그</span>
              </Link>
            </div>
            <div className={styles.icon}>
              <Link href={`/blog/${nickname}`}>
                <span>내블로그</span>
              </Link>
            </div>
            <div className={styles.icon}>
              <SignoutButton />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

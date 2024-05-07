import React from 'react';
import styles from './beforeMenu.module.css';
import Link from 'next/link';

export default function BeforeMenu() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" scroll={true}>
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
              <Link href="/signin" className={styles.icon}>
                <span>로그인</span>
              </Link>
            </div>
            <div className={styles.icon}>
              <Link href="/signup" className={styles.icon}>
                <span>회원가입</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

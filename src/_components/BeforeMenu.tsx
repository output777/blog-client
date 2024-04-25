import React from 'react';
import styles from './beforeMenu.module.scss';
import Link from 'next/link';
import TechStack from './TechStack';
import AboutMe from './AboutMe';

export default function BeforeMenu() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <span>Hi</span>Blog
          </Link>
        </div>
        <div className={styles.menuContainer}>
          <nav className={styles.nav}>
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
      <div className={styles.descBox}>
        <div className={styles.descTextBox}>
          블로그를 만들고 <span>공유하고 연결하세요!</span>
        </div>
        <div className={styles.techBox}>
          <TechStack />
        </div>
      </div>
      <div className={styles.aboutBox}>
        <AboutMe />
      </div>
    </>
  );
}

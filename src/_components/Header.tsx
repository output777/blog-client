import Link from 'next/link';
import React from 'react';
import styles from './styles/header.module.css';
import {Session} from 'next-auth';
import SignoutButton from './SignoutButton';

type SessionProps = {session: Session | null};
export default function Header({session}: SessionProps) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_common}>
          <div className={styles.inner}>
            <div>
              <div className={styles.area_logo}>
                <Link href="/" className={styles.logo_hiblog_logo}>
                  <span>H</span> blog
                </Link>
              </div>
            </div>
            <div className={styles.area_sign}>
              {session ? (
                <>
                  <div className={styles.area_sign_link_profile}>
                    <Link href={`/blog/${session?.user?.name}`}>
                      <strong>{session?.user?.name}</strong>님
                    </Link>
                  </div>
                  <div className={styles.area_sign_link_setting}>
                    <Link href={`/blog/${session?.user?.name}/setting`}>관리</Link>
                  </div>
                  <SignoutButton />
                </>
              ) : (
                <>
                  <div className={styles.area_sign_link}>
                    <Link href="/signin">로그인</Link>
                  </div>
                  <div className={styles.area_sign_link}>
                    <Link href="/signup">회원가입</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

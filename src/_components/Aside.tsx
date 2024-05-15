import React from 'react';
import styles from './styles/aside.module.css';
import Link from 'next/link';
import {CiUser} from 'react-icons/ci';
import GoogleLoginButton from './GoogleLoginButton';
import {Session} from 'next-auth';
import SignoutButton from './SignoutButton';

type SessionProps = {session: Session | null};
export default function Aside({session}: SessionProps) {
  return (
    <div className={styles.aside}>
      <div className={styles.area_signin}>
        {session ? (
          <div className={styles.wrap_my_information}>
            <div className={styles.area_my_account}>
              <Link href={`/blog/${session?.user?.name}`} className={styles.name}>
                <strong>{session?.user?.name}</strong>님
              </Link>
              <SignoutButton />
            </div>
            <div className={styles.menu_my_blog}>
              <Link href={`/blog/${session?.user?.name}`}>내 블로그</Link>
              <Link href={`/blog/${session?.user?.name}/write`}>글쓰기</Link>
            </div>
          </div>
        ) : (
          <div className={styles.login}>
            <p className={styles.top_text}>하이블로그를 보다 편리하고 안전하게 이용하세요</p>
            <Link href={'/signin'} className={styles.login_button}>
              <span className={styles.login_text}>HIBLOG 로그인</span>
            </Link>
            <div className={styles.menu_signin}>
              <Link href={'/signup'}>
                <CiUser />
                <span className={styles.signin}>회원가입</span>
              </Link>
              <GoogleLoginButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

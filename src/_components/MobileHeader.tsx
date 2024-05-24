'use client';
import React, {useEffect, useState} from 'react';
import {HiOutlineDotsVertical} from 'react-icons/hi';
import styles from './styles/mobileHeader.module.css';
import Link from 'next/link';
import {useSession} from 'next-auth/react';

export default function MobileHeader() {
  const session = useSession();
  const [active, setActive] = useState(false);

  const activeHandler = () => {
    setActive((prev) => !prev);
  };

  const handleClickOutside = (e: Event) => {
    const target = e.target as HTMLElement;
    const name = target.getAttribute('name');

    if (name !== 'dots_button') {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Link href={`/blog/${session?.data?.user?.name}`} className={styles.user_nickname}>
        <strong>{session?.data?.user?.name}</strong>님
      </Link>
      <button className={styles.button_wrap} onClick={activeHandler} name="dots_button">
        <HiOutlineDotsVertical name="dots_button" />
      </button>
      {session ? (
        <div className={`${styles.menu_wrap} ${!active ? styles.none : ''}`}>
            <Link href={`/blog/${session?.data?.user?.name}`} className={styles.my_blog}>내블로그</Link>
            <Link href={`/blog/${session?.data?.user?.name}/write`} className={styles.write}>글쓰기</Link>
            <Link href={`/blog/${session?.data?.user?.name}/setting`} className={styles.setting}>관리</Link>
        </div>
      ) : (
        <div className={`${styles.menu_wrap} ${!active ? styles.none : ''}`}>
          <div className={styles.signin}>
            <Link href="/signin">로그인</Link>
          </div>
          <div className={styles.signout}>
            <Link href="/signup">회원가입</Link>
          </div>
        </div>
      )}
    </div>
  );
}

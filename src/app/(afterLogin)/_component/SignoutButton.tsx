'use client';

import React from 'react';
import {getSession, signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import styles from './signout.module.css';

export default function SignoutButton() {
  const router = useRouter();

  const onSignout = async () =>
    await signOut({redirect: false})
      .then(
        async () =>
          await fetch('api/signout')
            .then(async () => {
              const session = await getSession();
              console.log('session', session);
              sessionStorage.clear();
              localStorage.clear();
              router.replace('/');
            })
            .catch((err) => console.error(err))
      )
      .catch((err) => console.error(err));

  return (
    <div className={styles.icon} onClick={onSignout}>
      <span>로그아웃</span>
    </div>
  );
}

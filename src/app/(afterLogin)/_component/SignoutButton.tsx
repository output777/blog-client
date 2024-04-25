'use client';

import React from 'react';
import {signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import styles from './signout.module.scss';

export default function SignoutButton() {
  const router = useRouter();

  const onSignout = async () =>
    await signOut({redirect: false}).then(async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        console.log('response', await response.json());
        router.replace('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    });

  return (
    <div className={styles.icon} onClick={onSignout}>
      <span>로그아웃</span>
    </div>
  );
}

'use client';

import React from 'react';
import {signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import styles from './signout.module.css';

export default function SignoutButton() {
  const router = useRouter();

  const onSignout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      await signOut({redirect: false}).then(() => router.replace('/'));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.icon} onClick={onSignout}>
      <span>로그아웃</span>
    </div>
  );
}

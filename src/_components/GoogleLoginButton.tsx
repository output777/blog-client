// 'use client';
import React from 'react';
import {signIn} from 'next-auth/react';
import styles from './googleLoginButton.module.css';
import Image from 'next/image';

export default function GoogleLoginButton() {
  const handleLogin = () => {
    signIn('google', {callbackUrl: '/home'});
  };

  return (
    <div className={styles.socialLogin} onClick={handleLogin}>
      <div className={styles.icon}>
        <Image src="/images/menu-logos/google.svg" alt="google icon" width={30} height={30} />
        <span>구글 로그인</span>
      </div>
    </div>
  );
}

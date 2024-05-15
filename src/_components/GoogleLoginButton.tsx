'use client';
import Image from 'next/image';
import React from 'react';
import {signIn} from 'next-auth/react';
import styles from './styles/googleLoginButton.module.css';

export default function GoogleLoginButton() {
  const googleLoginHandler = () => {
    signIn('google', {callbackUrl: '/'});
  };
  return (
    <div className={styles.google_login} onClick={googleLoginHandler}>
      <Image src="/images/menu-logos/google.svg" alt="google icon" width={16} height={16} />
      <span>구글로그인</span>
    </div>
  );
}

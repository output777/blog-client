import React from 'react';
import styles from './styles/signout.module.css';
import {signOut} from '@/auth';

export default function SignoutButton() {
  return (
    <form
      className={styles.area_signout_btn}
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">로그아웃</button>
    </form>
  );
}

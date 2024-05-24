'use client';

import React, {useRef, useState} from 'react';
import styles from '@/app/_styles/signin.module.css';
import {useFormState, useFormStatus} from 'react-dom';
import Link from 'next/link';
import {onSubmitSignIn} from '../_lib/signin';
import {CiUser} from 'react-icons/ci';
import {PiLockLight} from 'react-icons/pi';
import Image from 'next/image';
import GoogleLoginButton from '@/_components/GoogleLoginButton';

function showMessage(message: string) {
  if (message === 'no_email') {
    return '이메일을 입력하세요';
  }
  if (message === 'no_password') {
    return '비밀번호를 입력하세요';
  }
  if (message === 'failed_signin') {
    return '로그인을 실패했습니다';
  }
}

export default function SigninPage() {
  const [state, formAction] = useFormState(onSubmitSignIn, {message: ''});
  const {pending} = useFormStatus();

  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [idActive, setIdActive] = useState(false);
  const [pwActive, setPwActive] = useState(false);

  const idFocusHandler = () => {
    if (idRef.current) {
      idRef.current.focus();
      setIdActive(true);
    }
  };

  const idBlurHandler = () => {
    setIdActive(false);
  };

  const pwFocusHandler = () => {
    if (pwRef.current) {
      pwRef.current.focus();
      setPwActive(true);
    }
  };

  const pwBlurHandler = () => {
    setPwActive(false);
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.header}>
        HIBLOG
      </Link>
      <form className={styles.form} action={formAction}>
        <div className={styles.inner}>
          <div
            className={`${styles.first_input_row} ${idActive ? styles.borderActive : ''}`}
            onClick={idFocusHandler}
          >
            <div className={styles.icon_cell}>
              <span className={`${styles.icon} ${idActive ? styles.iconActive : ''}`}>
                <CiUser />
              </span>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일"
              title="이메일"
              className={styles.input_text}
              maxLength={41}
              ref={idRef}
              onBlur={idBlurHandler}
            />
          </div>
          <div
            className={`${styles.last_input_row} ${pwActive ? styles.borderActive : ''}`}
            onClick={pwFocusHandler}
          >
            <div className={styles.icon_cell}>
              <span className={`${styles.icon} ${pwActive ? styles.iconActive : ''}`}>
                <PiLockLight />
              </span>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호"
              title="비밀번호"
              className={styles.input_text}
              maxLength={16}
              ref={pwRef}
              onBlur={pwBlurHandler}
            />
          </div>
          <div className={styles.error}>{showMessage(state?.message as string)}</div>
          <div className={styles.btn_login_wrap}>
            <button type="submit" className={styles.btn_login}>
              <span className={styles.btn_text}>로그인</span>
            </button>
          </div>
        </div>
      </form>
      <div className={styles.signup_wrap}>
        <div className={styles.signup}>
          <div>아이디가 없으신가요?</div>
          <div className={styles.line}>
            <Link href="/signup">회원가입</Link>
          </div>
        </div>
        <GoogleLoginButton />
      </div>
    </div>
  );
}

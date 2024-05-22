'use client';

import Link from 'next/link';
import React, {useEffect, useRef, useState} from 'react';
import {useFormState, useFormStatus} from 'react-dom';
import styles from '@/app/_styles/signup.module.css';
import {onSubmitSignUp} from '../_lib/signup';

function showMessage(message: string) {
  if (message === 'no_email') {
    return '이메일을 입력하세요';
  }
  if (message === 'no_nickname') {
    return '닉네임을 입력하세요';
  }
  if (message === 'no_password') {
    return '비밀번호를 입력하세요';
  }
  if (message === 'already_Email') {
    return '이미 사용 중인 아이디입니다.';
  }
  if (message === 'already_Nickname') {
    return '이미 사용 중인 닉네임입니다.';
  }
  if (message === 'already_Both') {
    return '이미 사용 중인 아이디입니다.';
  }
  if (message === 'Nickname cannot start with @') {
    return '닉네임은 @로 시작할 수 없습니다.';
  }
}

export default function SignupPage() {
  const [state, formAction] = useFormState(onSubmitSignUp, {message: ''});
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [idActive, setIdActive] = useState(false);
  const [nameActive, setNameActive] = useState(false);
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

  const nameFocusHandler = () => {
    if (nameRef.current) {
      nameRef.current.focus();
      setNameActive(true);
    }
  };

  const nameBlurHandler = () => {
    setNameActive(false);
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
              <span className={`${styles.icon} ${idActive ? styles.iconActive : ''}`}>이메일</span>
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
            className={`${styles.middle_input_row} ${nameActive ? styles.borderActive : ''}`}
            onClick={nameFocusHandler}
          >
            <div className={styles.icon_cell}>
              <span className={`${styles.icon} ${nameActive ? styles.iconActive : ''}`}>
                닉네임
              </span>
            </div>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="닉네임"
              title="닉네임"
              className={styles.input_text}
              maxLength={41}
              ref={nameRef}
              onBlur={nameBlurHandler}
            />
          </div>
          <div
            className={`${styles.last_input_row} ${pwActive ? styles.borderActive : ''}`}
            onClick={pwFocusHandler}
          >
            <div className={styles.icon_cell}>
              <span className={`${styles.icon} ${pwActive ? styles.iconActive : ''}`}>
                비밀번호
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
              <span className={styles.btn_text}>회원가입</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

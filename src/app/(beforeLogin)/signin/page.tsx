'use client';

import React from 'react';
import styles from './page.module.scss';
import InputField from '@/_components/InputField';
import Button from '@/_components/Button';
import Link from 'next/link';
import CloseButton from '../_component/CloseButton';
import {onSubmitSignIn} from '../_lib/signin';
import {useFormState, useFormStatus} from 'react-dom';
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

export default function Page() {
  const [state, formAction] = useFormState(onSubmitSignIn, {message: ''});
  const {pending} = useFormStatus();

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <CloseButton />
        <form className={styles.form} action={formAction}>
          <p style={{width: '100%'}}>블로그에 로그인하세요</p>
          <GoogleLoginButton />
          <div className={styles.inputBox}>
            <label className={styles.inputTitle} htmlFor="email">
              이메일
            </label>
            <InputField
              className={styles.input}
              id={'email'}
              name={'email'}
              type={'email'}
              placeholder={'email'}
              required={true}
            />
          </div>
          <div className={styles.inputBox}>
            <label className={styles.inputTitle} htmlFor="password">
              비밀번호
            </label>
            <InputField
              className={styles.input}
              id={'password'}
              name={'password'}
              type={'password'}
              placeholder={'password'}
              required={true}
            />
          </div>
          <Button type={'submit'} className={styles.button} label={'로그인'} disabled={pending} />
          <div className={styles.error}>{showMessage(state?.message as string)}</div>
        </form>
        <div className={styles.lineBox}>
          <div className={`${styles.line}`}>아이디가 없으신가요?</div>
          <div>
            <Link href="/signup">회원가입 하러가기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

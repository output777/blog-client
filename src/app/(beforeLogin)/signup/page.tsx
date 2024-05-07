'use client';
import React from 'react';
import styles from './page.module.css';
import InputField from '@/_components/InputField';
import Button from '@/_components/Button';
import {useFormState, useFormStatus} from 'react-dom';
import {onSubmitSignUp} from '../_lib/signup';
import CloseButton from '../_component/CloseButton';

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

export default function SignUpPage() {
  const [state, formAction] = useFormState(onSubmitSignUp, {message: ''});
  const {pending} = useFormStatus();

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <CloseButton />
        <form className={styles.form} action={formAction}>
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
            <label className={styles.inputTitle} htmlFor="nickname">
              닉네임
            </label>
            <InputField
              className={styles.input}
              id={'nickname'}
              name={'nickname'}
              type={'text'}
              placeholder={'nickname'}
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
          <Button
            className={styles.button}
            type={'submit'}
            label={'가입하기'}
            disabled={pending}
          ></Button>
          <div className={styles.error}>{showMessage(state?.message as string)}</div>
        </form>
      </div>
    </div>
  );
}

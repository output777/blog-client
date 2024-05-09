'use server';

import {signIn} from '@/auth';
import {getSession} from 'next-auth/react';
import {redirect} from 'next/navigation';

export const onSubmitSignIn = async (prevState: any, formData: FormData) => {
  if (!formData.get('email') || !(formData.get('email') as string)?.trim()) {
    return {message: 'no_email'};
  }
  if (!formData.get('password') || !(formData.get('password') as string)?.trim()) {
    return {message: 'no_password'};
  }

  let shouldRedirect = false;
  try {
    await signIn('credentials', {
      username: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    shouldRedirect = true;
  } catch (err) {
    return {message: 'failed_signin'};
  }

  if (shouldRedirect) {
    redirect('/blog'); // try/catch문 안에서 X
  }
};

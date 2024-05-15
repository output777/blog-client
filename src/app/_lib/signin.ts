'use server';

import {signIn} from '@/auth';
import {redirect} from 'next/navigation';

export const onSubmitSignIn = async (previousState: any, formData: FormData) => {
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
  } catch {
    return {message: 'failed_signin'};
  }

  if (shouldRedirect) {
    redirect('/');
  }
};

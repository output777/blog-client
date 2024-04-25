'use server';

import {signIn} from '@/auth';
import {redirect} from 'next/navigation';

export const onSubmitSignUp = async (prevState: any, formData: FormData) => {
  if (!formData.get('email') || !(formData.get('email') as string)?.trim()) {
    return {message: 'no_email'};
  }
  if (!formData.get('nickname') || !(formData.get('nickname') as string)?.trim()) {
    return {message: 'no_nickname'};
  }
  if (!formData.get('password') || !(formData.get('password') as string)?.trim()) {
    return {message: 'no_password'};
  }

  let shouldRedirect = false;
  const signupData = {
    email: formData.get('email'),
    nickname: formData.get('nickname'),
    password: formData.get('password'),
    provider: 'credentials',
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
      credentials: 'include',
    });
    if (response.status === 409) {
      const message = await response.json();
      return message;
    }
    shouldRedirect = true;
    await signIn('credentials', {
      username: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
  } catch (err) {
    console.error('err!', err);
  }
  if (shouldRedirect) {
    redirect('/blog'); // try/catch문 안에서 X
  }
};

'use server';

import {signIn} from '@/auth';
import {redirect} from 'next/navigation';

interface SignupDataProps {
  email: FormDataEntryValue | null;
  nickname: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  provider: string;
}

export const signupHandler = async (signupData: SignupDataProps) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupData),
  });

  if (!response.ok) {
    throw new Error('failed_signupHandler');
  }

  const resultJson = await response.json();
  return resultJson;
};

export const onSubmitSignUp = async (prevState: any, formData: FormData) => {
  if (!formData.get('email') || !(formData.get('email') as string)?.trim()) {
    return {message: 'no_email'};
  }
  if (!formData.get('nickname') || !(formData.get('nickname') as string)?.trim()) {
    return {message: 'no_nickname'};
  }
  if (formData.get('nickname')?.toString().slice(0, 1) === '@') {
    return {message: 'Nickname cannot start with @'};
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
    const res = await signupHandler(signupData);
    await signIn('credentials', {
      username: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    shouldRedirect = true;
  } catch {
    return {message: 'failed_signup'};
  }

  if (shouldRedirect) {
    redirect('/');
  }
};

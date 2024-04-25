'use client';
import React from 'react';
import {useRouter} from 'next/navigation';
import Button from './Button';

export default function BackButton() {
  const router = useRouter();
  return (
    <div>
      <Button label="뒤로가기" onClick={() => router.back()} />
    </div>
  );
}

'use client';
import {useSession} from 'next-auth/react';
import React from 'react';
import AtferMenu from './AfterMenu';
import BeforeMenu from './BeforeMenu';

type Props = {nickname?: string | null; email?: string | null};
export default function Nav({nickname, email}: Props) {
  const {data: session, status} = useSession();

  return (
    <>
      {status === 'authenticated' ? (
        <AtferMenu nickname={session?.user?.name} email={session?.user?.email} />
      ) : (
        <BeforeMenu />
      )}
    </>
  );
}

import Post from '@/_components/Post';
import {auth} from '@/auth';
import React from 'react';

export default async function PostPage() {
  const session = await auth();
  const nickname = session?.user?.name;

  return <Post nickname={nickname} />;
}

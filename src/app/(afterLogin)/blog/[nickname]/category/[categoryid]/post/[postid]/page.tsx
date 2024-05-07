import React from 'react';
import Post from '@/_components/Post';
import {auth} from '@/auth';

export default async function PostPage() {
  const session = await auth();
  const nickname = session?.user?.name;

  return <Post nickname={nickname} />;
}

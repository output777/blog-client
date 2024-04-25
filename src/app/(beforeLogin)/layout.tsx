import {ReactNode} from 'react';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {auth} from '@/auth';
import BeforeMenu from '@/_components/BeforeMenu';

type Props = {children: ReactNode};
export default async function Layout({children}: Props) {
  const session = await auth();

  if (session) {
    redirect('/blog');
  }
  return (
    <div>
      <BeforeMenu />
      {children}
    </div>
  );
}

import {ReactNode} from 'react';
import AtferMenu from '@/_components/AfterMenu';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';

type Props = {children: ReactNode};
export default async function Layout({children}: Props) {
  const session = await auth();

  if (!session) {
    redirect('/signin');
  }

  return (
    <div>
      <AtferMenu nickname={session?.user?.name} email={session?.user?.email} />
      {children}
    </div>
  );
}

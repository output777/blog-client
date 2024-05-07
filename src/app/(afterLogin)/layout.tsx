import {ReactNode} from 'react';
import AtferMenu from '@/_components/AfterMenu';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import Loading from '@/_components/Loading';
import BeforeMenu from '@/_components/BeforeMenu';

type Props = {children: ReactNode};
export default async function Layout({children}: Props) {
  const session = await auth();

  // if (!session) {
  //   redirect('/signin');
  // }

  return (
    <div>
      {session ? (
        <AtferMenu nickname={session?.user?.name} email={session?.user?.email} />
      ) : (
        <BeforeMenu />
      )}
      {children}
    </div>
  );
}

import {ReactNode} from 'react';
import AtferMenu from '@/_components/AfterMenu';
import {auth} from '@/auth';
import BeforeMenu from '@/_components/BeforeMenu';

type Props = {children: ReactNode};
export default async function Layout({children}: Props) {
  const session = await auth();

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

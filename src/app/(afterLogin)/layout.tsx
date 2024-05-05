import {ReactNode} from 'react';
import AtferMenu from '@/_components/AfterMenu';
import {auth} from '@/auth';

type Props = {children: ReactNode};
export default async function Layout({children}: Props) {
  const session = await auth();

  return (
    <div>
      <AtferMenu nickname={session?.user?.name} email={session?.user?.email} />
      {children}
    </div>
  );
}

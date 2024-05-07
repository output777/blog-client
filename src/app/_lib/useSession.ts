import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';

const useSessionHandler = async () => {
  const {data, status} = useSession();

  if (status === 'unauthenticated') {
    redirect('/');
  }
};

export default useSessionHandler;

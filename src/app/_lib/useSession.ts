import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';

const useSessionHandler = async () => {
  const {data, status} = useSession();
  console.log('data', data);
  console.log('status', status);

  if (status === 'unauthenticated') {
    redirect('/');
  }
};

export default useSessionHandler;

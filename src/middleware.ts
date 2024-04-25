import {NextResponse} from 'next/server';
import {auth} from './auth';

export async function middleware() {
  const session = await auth();
  console.log('session!!!', session);
  if (!session) {
    return NextResponse.redirect('http://localhost:3000/signin');
  }
}

export const config = {
  matcher: ['/home'],
};

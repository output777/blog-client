import {NextResponse} from 'next/server';
import {auth} from './auth';

export async function middleware() {
  const session = await auth();
  if (!session) {
    // return NextResponse.redirect('/signin');
  }
}

export const config = {
  // matcher: ['/blog'],
};

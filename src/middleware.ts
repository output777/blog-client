import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {auth} from './auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.rewrite(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: ['/blog'],
};

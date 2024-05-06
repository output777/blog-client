// import {NextResponse} from 'next/server';
// import type {NextRequest} from 'next/server';
// import {auth} from './auth';

// export async function middleware(request: NextRequest) {
//   const session = await auth();
//   console.log('session1', session, !session);
//   if (!session) {
//     console.log('session2', session);
//     console.log('request.url', request.url);
//     // return NextResponse.rewrite(new URL('/signin', request.url));
//   }
// }

// export const config = {
//   matcher: ['/blog'],
// };

import {ReactNode} from 'react';
import type {Metadata} from 'next';
import {Noto_Sans_KR} from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import {QueryClientProviderWithClient} from '@/_components/QueryClientProviderWithClient';
import AuthSession from '@/_components/AuthSession';
import Loading from '@/_components/Loading';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HiBlog',
  description: '블로그를 만들고 공유하고 연결하세요!',
  openGraph: {
    title: 'HiBlog',
    description: '블로그를 만들고 공유하고 연결하세요!',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={`${notoSansKR.className}`}>
          <QueryClientProviderWithClient>
            <AuthSession>
              <Loading />
              <div>{children}</div>
            </AuthSession>
          </QueryClientProviderWithClient>
        </body>
      </html>
    </>
  );
}

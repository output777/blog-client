import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const {
  handlers: {GET, POST},
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        try {
          const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
          });

          if (!authResponse.ok) {
            console.error('인증 실패:', await authResponse.text()); // 로그에 더 많은 정보를 출력할 수 있도록 수정
            throw new Error('CredentialsSignin');
          }

          const user = await authResponse.json();
          return {
            email: user.email,
            nickname: user.name,
            ...user,
          };
        } catch (err) {
          console.error('로그인 처리 중 오류 발생:', err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({user, account}) => {
      if (account?.provider !== 'credentials') {
        const socialSignupData = {
          email: user.email,
          nickname: `@${user.name}`,
          password: null,
          provider: account?.provider,
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(socialSignupData),
        });

        if (response.status === 500) return false;
      }
      user.name = `${user.name} ${account?.provider}`;
      return true;
    },
    jwt: async ({token, user}) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({session, token}) => {
      const currentProvider = session.user.name?.split(' ');
      session.sessionToken = token.jti as string;
      session.user.name =
        currentProvider && currentProvider[1] === 'credentials'
          ? `${currentProvider[0]}`
          : `@${currentProvider?.[0]}`;
      return session;
    },
    redirect: async ({baseUrl}) => {
      return baseUrl + '/';
    },
  },
  secret: process.env.AUTH_SECRET || 'any random string',
});

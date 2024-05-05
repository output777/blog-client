import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/signin',
    newUser: '/signup',
  },
  providers: [
    CredentialProvider({
      async authorize(credentials) {
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
          return null;
        }
        const user = await authResponse.json();
        console.log('user', user);
        return {
          email: user.email,
          nickname: user.name,
          ...user,
        };
      },
    }),
    GoogleProvider({
      // Google 로그인 설정 추가
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({user, account}) => {
      if (account?.provider !== 'credentials') {
        const signupData = {
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
          body: JSON.stringify(signupData),
        });

        if (response.status === 500) return false;
      }
      user.name = `${user.name} ${account?.provider}`;
      return true;
    },
    session: async ({session}) => {
      const currentProvider = session.user.name?.split(' ');
      session.user.name =
        currentProvider && currentProvider[1] === 'credentials'
          ? `${currentProvider[0]}`
          : `@${currentProvider?.[0]}`;
      return session;
    },
    redirect: async ({url, baseUrl}) => {
      return baseUrl + '/blog';
    },
  },
  secret: process.env.AUTH_SECRET,
});

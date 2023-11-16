import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import User from '@/db/models/User';

export const authOptions = {
  // "Credentials provider can only be used if JSON Web Tokens are enabled for sessions"
  // https://next-auth.js.org/providers/credentials#overview
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        console.log('AUTHORIZE - AUTHENTICATING USER');

        // Ensure credentials were provided
        if (!credentials.email || !credentials.password) {
          throw new Error('Invalid credentials');
        }

        // Find user by provided email
        const user = await User.findOne({ email: credentials.email });
        console.log('user with provided email found:', user);

        // User with provided email doesn't exist
        if (!user) throw new Error('Invalid credentials');

        // User does exist
        // Check if password provided matches the hashed password in DB
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log('Do passwords match?', passwordsMatch);

        // Passwords don't match
        if (!passwordsMatch) throw new Error('Invalid credentials');

        // Passwords match - user is authenticated, return user
        console.log('AUTHORIZE - USER AUTHENTICATED');
        return user;
      },
    }),
  ],
  callbacks: {
    // Use to add properties to JWT
    async jwt({ token, user }) {
      console.log('JWT CALLBACK');

      // Add user role to token
      if (user) token.role = user.role;

      return token;
    },
    // Use to expose properties on client
    async session({ session, token }) {
      console.log('SESSION CALLBACK');

      // Expose user id & role (if they exist)
      // NOTE: anything with value of undefined is auto-excluded from session
      session.user.id = token.sub;
      session.user.role = token.role;

      console.log('token:', token);
      console.log('session:', session);

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },

  // Required in production to hash tokens
  secret: process.env.NEXTAUTH_SECRET,
  // Throw auth errors in development env only
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // allowDangerousEmailAccountLinking: true
    }),
  ],
  callbacks: {
    // Used to store users authenticated via GoogleProvider
    async signIn({ user, account, profile, email, credentials }) {
      console.log('SIGN-IN CALLBACK');
      console.log('sign in context:', {
        user,
        account,
        profile,
        email,
        credentials,
      });

      // Prevent sign-in via unsupported provider
      const whitelistedProviders = ['credentials', 'google'];
      if (!whitelistedProviders.includes(account.provider)) {
        console.error('Unsupported provider:', account.provider);
        return false;
      }

      // Handle Sign-in via Google provider
      if (account?.provider === 'google') {
        try {
          const userExists = await User.findOne({ email: user.email });

          if (userExists) {
            // Attach properties to make them available in JWT session
            // NOTE: you cannot point `user` to a new object, you can only overwrite/append properties
            user.id = userExists.id; // overwrite with user id from DB
            user.role = userExists.role;
            console.log('Existing user signed in via Google');
          } else {
            // Register new user associated with the given Gmail account
            const { name, email, image } = user;
            const newUser = await User.create({
              name,
              email,
              image,
              provider: account.provider,
            });
            console.log('User created via Google Sign-in:', newUser);

            // Attach properties to make them available in JWT session
            user.id = newUser.id; // overwrite with user id from DB
            user.role = newUser.role;
          }

          return true;
        } catch (err) {
          console.error('Failed to login with Google Provider:', err);
          return false;
        }
      }

      // Other sign-in method used - e.g. CredentialsProvider
      return true;
    },
    // Use to add properties to JWT
    async jwt({ token, user }) {
      console.log('JWT CALLBACK');

      // Forward properties to the session to make them accessible on client
      // NOTE: `user` object only exist on first call to jwt() callback
      if (user) {
        console.log('user object:', user);
        // NOTE: token.sub is auto-set to user.id
        token.role = user.role;
      }

      return token;
    },
    // Use to expose properties on client
    async session({ session, token }) {
      console.log('SESSION CALLBACK');

      // Expose the following properties in the session object
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

import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { findUserByEmail } from '@/models/User';
import { JWT } from 'next-auth/jwt';

// Define the NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await findUserByEmail(credentials.email);
        if (user && (await compare(credentials.password, user.password))) {
          // Return user object with additional properties
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            allowedPages: user.allowedPages,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.role) {
        session.user.role = token.role as string; // Ensure type is string
      }
      session.user.allowedPages = token.allowedPages || [];
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role; // Ensure type is string
        token.allowedPages = user.allowedPages;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export the NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

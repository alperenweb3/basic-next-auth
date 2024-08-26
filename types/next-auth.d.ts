/* eslint-disable no-unused-vars */
import { DefaultSession } from 'next-auth';

// Extend the default session to include additional fields
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      allowedPages?: string[]; // Add allowedPages property
      role?: string; // Add role property
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    allowedPages?: string[]; // Add allowedPages property
    role?: string; // Add role property
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role?: string; // Add role property
    allowedPages?: string[]; // Add allowedPages property
  }
}

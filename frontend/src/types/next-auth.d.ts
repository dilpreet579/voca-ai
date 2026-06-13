import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
      company?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    company?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    firstName?: string;
    lastName?: string;
    company?: string;
  }
}

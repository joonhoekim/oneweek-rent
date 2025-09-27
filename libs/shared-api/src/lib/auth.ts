declare module '@auth/core/types' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
  }
}

export type { Session } from '@auth/core/types';
export type AuthUser = import('@auth/core/types').User;

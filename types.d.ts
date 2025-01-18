declare module '#auth-utils' {
  interface User {
    avatar?: string;
    dob?: string;
    email: string;
    enabled: number;
    first_name: string; 
    id: number;
    last_name: string;
    last_seen: string;
    username: string;
  }

  interface UserSession {
    user: User,
    secure: {
      token: string
    },
    permissions: Array<string>;
    status: number;
    expiredToken: string
  }
  interface UserSessionRequired {
    user: User,
    secure: {
      token: string
    },
    permissions: Array<string>;
    status: number;
    expiredToken: string
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {}

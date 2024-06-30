declare module "@auth/core/types" {

  interface Session extends User {}
  interface User {
    first_name?: string;
    last_name?: string;
    name: string;
    permissions: Array<string>
    picture: string;
    roles: Array<string>;
    status: number;
  }
}

export {}

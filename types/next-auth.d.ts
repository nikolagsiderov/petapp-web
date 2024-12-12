import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    role: number;
    user: User;
  }

  interface User {
    id: string;
    email: string;
    jwt: string;
  }
}

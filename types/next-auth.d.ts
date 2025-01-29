import { Session } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` & `getServerSession`
   * Modifying the below defined interfaces will affect the [...nextauth].ts
   */
  interface Session {
    id: string;
    user: User;
  }

  interface User {
    jwt: string;
    id: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
}

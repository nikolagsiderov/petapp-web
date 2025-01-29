import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { requestCurrent } from "./client";
import { User } from "pawpal-fe-types";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (session) {
      if (session.user) {
        return session.user;
      } else {
        // Request current user from BE
        const currentUser: User | null = await requestCurrent();

        if (!currentUser) {
          return null;
        }
        
        return currentUser;
      }
    }

    return null;
  } catch (error: any) {
    return null;
  }
}

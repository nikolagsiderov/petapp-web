import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticate } from "@/app/actions/users/client";
import axios from "axios";
import NextAuth, { AuthOptions, Session } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Моля въведи емайл и парола за вход.");
        }

        const response = await authenticate({
          email: credentials.email,
          password: credentials.password,
        });

        const config = {
          headers: { Authorization: `Bearer ${response.jwt}` },
        };

        const user = await axios
          .get(
            process.env.NEXT_PUBLIC_USERS_API + "/api/v1/users/current",
            config
          )
          .then((response) => {
            return response?.data;
          })
          .catch((error) => {
            return null;
          });
        if (response?.success && user) {
          return { ...user, jwt: response.jwt as string };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user.jwt = token.jwt;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

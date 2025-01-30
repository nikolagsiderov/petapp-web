import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticate } from "pawpal-fe-users-server-actions";
import NextAuth, { AuthOptions, Session } from "next-auth";
import { getCurrentUser } from "pawpal-fe-users-server-actions";

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

        const currentUser = await getCurrentUser(response.jwt);

        if (response?.success && currentUser && currentUser.success) {
          currentUser.jwt = response.jwt as string;
          return currentUser;
        }
      },
    }),
  ],
  callbacks: {
    /**
     * async jwt() & async session() callback functions are returned by `useSession`, `getSession` & `getServerSession`
     */
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.name = `${user.firstName} ${user.lastName}`;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user.jwt = token.jwt;
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.name = `${token.firstName} ${token.lastName}`;
      session.user.createdAt = token.createdAt;
      session.user.updatedAt = token.updatedAt;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours, should be always synced with BE
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

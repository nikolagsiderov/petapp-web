"use client";

import ToasterProvider from "./providers/ToasterProvider";
import ClientOnly from "@/app/components/ClientOnly";
import TanStackReactQueryProvider from "./providers/TanStackReactQueryProvider";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@/app/i18n";

const AppClient = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <TanStackReactQueryProvider>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_WEB_GOOGLE_OAUTH_CLIENT_ID ?? ""}
        >
          <ClientOnly>
            <ToasterProvider />
            <div>{children}</div>
          </ClientOnly>
        </GoogleOAuthProvider>
      </TanStackReactQueryProvider>
    </AuthProvider>
  );
};

export default AppClient;

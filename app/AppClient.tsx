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
        <GoogleOAuthProvider clientId="508483481007-bnvs2k6jpc0ei0t075ecps22b5cbga8f.apps.googleusercontent.com">
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

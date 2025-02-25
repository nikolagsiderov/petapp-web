import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import ClientOnly from "@/app/components/ClientOnly";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ReduxProvider } from "./providers/ReduxProvider";
import TanStackReactQueryProvider from "./providers/TanStackReactQueryProvider";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PawPal",
  description: "Pet-related application. Codename: PetApp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TanStackReactQueryProvider>
            <ReduxProvider>
              <ClientOnly>
                <ToasterProvider />
                <div>{children}</div>
              </ClientOnly>
            </ReduxProvider>
          </TanStackReactQueryProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AppClient from "./AppClient";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
});

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
      <body className={montserrat.className}>
        <AppClient>{children}</AppClient>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

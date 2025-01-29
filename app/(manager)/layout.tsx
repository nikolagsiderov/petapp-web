import ClientOnly from "../components/ClientOnly";
import Sidebar from "../components/navbar/manage/Sidebar";
import { getPendingReservationsCount } from "pawpal-fe-listings-server-actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

async function getSession() {
  return await getServerSession(authOptions);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const currentUser = session?.user;

  if (session === null) {
    redirect("/auth");
  }

  const response = await getPendingReservationsCount(currentUser!.jwt);
  const pendingReservationsCount = response?.success ? response.count : 0;

  return (
    <ClientOnly>
      <Sidebar
        currentUser={currentUser!}
        requestsCount={pendingReservationsCount}
      />
      <div>{children}</div>
    </ClientOnly>
  );
}

import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import Sidebar from "../components/navbar/manage/Sidebar";
import { getPendingReservationsCount } from "pawpal-fe-listings-server-actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  const response = await getPendingReservationsCount();
  const pendingReservationsCount = response?.success ? response.count : 0;

  return (
    <ClientOnly>
      <Sidebar
        currentUser={currentUser}
        requestsCount={pendingReservationsCount}
      />
      <div>{children}</div>
    </ClientOnly>
  );
}

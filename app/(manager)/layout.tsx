import ClientOnly from "../components/ClientOnly";
import Sidebar from "../components/navbar/manage/Sidebar";
import { getPendingReservationsCount } from "pawpal-fe-common/listings";
import { redirect } from "next/navigation";
import { getCurrentUser } from "pawpal-fe-common/users";
import webTokenGetter from "../context/webTokenGetter";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUserResponse = await getCurrentUser(webTokenGetter());
  const currentUser = currentUserResponse?.success ? currentUserResponse : null;

  if (!currentUserResponse?.success || !currentUser) {
    redirect("/auth");
  }

  const response = await getPendingReservationsCount(webTokenGetter());
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

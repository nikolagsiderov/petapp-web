import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import Sidebar from "../components/navbar/manage/Sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  // TODO: GET /api/v1/reservations/count
  const reservationRequestsCount = 0;

  return (
    <ClientOnly>
      <Sidebar
        currentUser={currentUser}
        requestsCount={reservationRequestsCount}
      />
      <div>{children}</div>
    </ClientOnly>
  );
}

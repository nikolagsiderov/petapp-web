import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import Sidebar from "../components/navbar/manage/Sidebar";
import { getReservationRequests } from "@/app/actions/reservations/getActions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  const reservationRequests = await getReservationRequests();
  const awaitingApproval = reservationRequests.filter(
    (request) => request.approved === false
  );

  return (
    <ClientOnly>
      <Sidebar currentUser={currentUser} requestsCount={awaitingApproval.length} />
      <div>{children}</div>
    </ClientOnly>
  );
}

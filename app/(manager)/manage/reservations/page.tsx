import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import { getPetsitterReservations } from "pawpal-fe-listings-server-actions";
import ReservationRequests from "./ReservationRequests";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

async function getSession() {
  return await getServerSession(authOptions);
}

const ReservationsPage = async () => {
  const session = await getSession();
  const currentUser = session?.user;

  if (session === null) {
    redirect("/auth");
  }

  const reservations = await getPetsitterReservations(currentUser!.jwt);

  if (
    reservations &&
    reservations.success &&
    reservations.collection &&
    reservations.collection.length > 0
  ) {
    return (
      <ClientOnly>
        <ReservationRequests currentUser={currentUser} reservationRequests={reservations.collection} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <EmptyState title="Нямате резервации" />
    </ClientOnly>
  );
};

export default ReservationsPage;

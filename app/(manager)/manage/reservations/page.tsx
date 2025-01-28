import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import { getPetsitterReservations } from "@/app/actions/listings/client";
import ReservationRequests from "./ReservationRequests";

const MyListingsPage = async () => {
  const reservations = await getPetsitterReservations();

  if (
    reservations &&
    reservations.success &&
    reservations.collection &&
    reservations.collection.length > 0
  ) {
    return (
      <ClientOnly>
        <ReservationRequests reservationRequests={reservations.collection} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <EmptyState title="Нямате резервации" />
    </ClientOnly>
  );
};

export default MyListingsPage;

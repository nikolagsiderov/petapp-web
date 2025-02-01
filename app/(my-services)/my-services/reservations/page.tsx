import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import { getPetsitterReservations } from "pawpal-fe-common/listings";
import ReservationRequests from "@/app/components/pages/my-services/reservations/ReservationRequests";
import webTokenGetter from "@/app/context/webTokenGetter";

const ReservationsPage = async () => {
  const response = await getPetsitterReservations(webTokenGetter());
  const reservations = response?.success ? response : null;

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

export default ReservationsPage;

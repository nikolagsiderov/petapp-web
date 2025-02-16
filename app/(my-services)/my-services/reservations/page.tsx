import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import ReservationRequests from "@/app/components/pages/my-services/reservations/ReservationRequests";
import usePetSitterReservations from "@/app/context/TRQs/listings/usePetSitterReservations";

const ReservationsPage = async () => {
  const { data: reservations } = usePetSitterReservations();

  if (reservations && reservations.length > 0) {
    return (
      <ClientOnly>
        <ReservationRequests reservationRequests={reservations} />
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

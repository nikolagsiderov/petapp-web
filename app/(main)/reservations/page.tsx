import EmptyState from "@/app/components/EmptyState";
import ReservationsClient from "@/app/components/pages/main/reservations/ReservationsClient";
import ClientOnly from "@/app/components/ClientOnly";
import useReservations from "@/app/context/TRQs/listings/useReservations";

const ReservationsPage = async () => {
  const { data: reservations } = useReservations();

  if (reservations === null || reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Няма намерени резервации"
          subtitle="Изглежда, че не сте направили резервации."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        upcomingReservations={reservations}
        pastReservations={reservations}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;

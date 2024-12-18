import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ReservationsClient from "./ReservationsClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getReservations } from "@/app/actions/listings/client";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Нямате достъп" subtitle="Влезте в своя профил" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations();
  // TODO: Create API endpoint for /api/v1/reservations/past/current-user & /api/v1/reservations/upcoming/current-user
  // const upcomingReservations = await getReservations({
  //   userId: currentUser.id,
  //   upcoming: true,
  // });
  // const pastReservations = await getReservations({
  //   userId: currentUser.id,
  //   past: true,
  // });

  if (
    reservations === null ||
    reservations?.success === null ||
    reservations?.success === false ||
    reservations?.collection.length === 0
  ) {
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
        upcomingReservations={reservations.collection}
        pastReservations={reservations.collection}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;

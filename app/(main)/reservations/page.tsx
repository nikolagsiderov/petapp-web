import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ReservationsClient from "./ReservationsClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getReservations } from "../../actions/reservations/getActions";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Нямате достъп" subtitle="Влезте в своя профил" />
      </ClientOnly>
    );
  }

  const upcomingReservations = await getReservations({
    userId: currentUser.id,
    upcoming: true,
  });
  const pastReservations = await getReservations({
    userId: currentUser.id,
    past: true,
  });

  if (upcomingReservations.length === 0 && pastReservations.length === 0) {
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
        upcomingReservations={upcomingReservations}
        pastReservations={pastReservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;

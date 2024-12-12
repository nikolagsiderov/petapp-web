import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import { getReservationRequests } from "@/app/actions/reservations/getActions";
import ReservationRequests from "./ReservationRequests";

const MyListingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Нямате достъп" subtitle="Влезте в своя профил" />
      </ClientOnly>
    );
  }

  const reservationRequests = await getReservationRequests();

  if (!reservationRequests) {
    return (
      <ClientOnly>
        <EmptyState title="Няма резервации чакащи одобрение" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationRequests
        reservationRequests={reservationRequests}
      />
    </ClientOnly>
  );
};

export default MyListingsPage;

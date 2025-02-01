import EmptyState from "@/app/components/EmptyState";
import ReservationsClient from "@/app/components/pages/main/reservations/ReservationsClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getReservations } from "pawpal-fe-common/listings";
import { redirect } from "next/navigation";
import { getCurrentUser } from "pawpal-fe-common/users";
import webTokenGetter from "@/app/context/webTokenGetter";

const ReservationsPage = async () => {
  const response = await getCurrentUser(webTokenGetter());
  const currentUser = response?.success ? response : null;

  if (!response?.success || !currentUser) {
    redirect("/auth");
  }

  const reservations = await getReservations(webTokenGetter());
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
    !reservations?.collection?.length ||
    reservations?.collection?.length === 0
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

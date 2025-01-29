import EmptyState from "@/app/components/EmptyState";
import ReservationsClient from "./ReservationsClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getReservations } from "pawpal-fe-listings-server-actions";
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

  const reservations = await getReservations(currentUser!.jwt);
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

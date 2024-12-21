import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
// import ReservationRequests from "./ReservationRequests"; // TODO: Uncomment after BE implementations...

const MyListingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Нямате достъп" subtitle="Влезте в своя профил" />
      </ClientOnly>
    );
  }

  // TODO: Uncomment after BE implementations...
  // const reservationRequests = await getReservationRequests();

  // TODO: Uncomment after BE implementations...
  // if (!reservationRequests) {
    return (
      <ClientOnly>
        <EmptyState title="Няма резервации чакащи одобрение" />
      </ClientOnly>
    );
  // }

  // TODO: Uncomment after BE implementations...
  // return (
  //   <ClientOnly>
  //     <ReservationRequests
  //       reservationRequests={reservationRequests}
  //     />
  //   </ClientOnly>
  // );
};

export default MyListingsPage;

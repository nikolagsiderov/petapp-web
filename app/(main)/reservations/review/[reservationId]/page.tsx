import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
// import ReviewClient from "./ReviewClient"; // TODO: Uncomment after BE implementations...
import ClientOnly from "@/app/components/ClientOnly";

interface IParams {
  reservationId?: string;
}

const ReviewPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  // const reservation = await getReservationById(params); // TODO: Uncomment after BE implementations...

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Нямате достъп" subtitle="Влезте в своя профил" />
      </ClientOnly>
    );
  }

  // if (!reservation) { // TODO: Uncomment after BE implementations...
    return (
      <ClientOnly>
        <EmptyState
          title="Няма намерена резервация"
          subtitle="Изглежда, че не тази резервация не съществува."
        />
      </ClientOnly>
    );
  // }

  // TODO: Uncomment after BE implementations...
  // return (
  //   <ClientOnly>
  //     <ReviewClient reservation={reservation} />
  //   </ClientOnly>
  // );
};

export default ReviewPage;

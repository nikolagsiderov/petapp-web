import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ReviewClient from "./ReviewClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getReservationById } from "@/app/actions/reservations/getActions";

interface IParams {
  reservationId?: string;
}

const ReviewPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const reservation = await getReservationById(params);

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Нямате достъп" subtitle="Влезте в своя профил" />
      </ClientOnly>
    );
  }

  if (!reservation) {
    return (
      <ClientOnly>
        <EmptyState
          title="Няма намерена резервация"
          subtitle="Изглежда, че не тази резервация не съществува."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReviewClient reservation={reservation} />
    </ClientOnly>
  );
};

export default ReviewPage;

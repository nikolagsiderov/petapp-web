import EmptyState from "@/app/components/EmptyState";
import ReviewClient from "@/app/components/pages/main/reservations/review/ReviewClient";
import ClientOnly from "@/app/components/ClientOnly";
import useReservationById from "@/app/context/TRQs/listings/useReservationById";

interface IParams {
  reservationId: string;
}

const ReviewPage = async ({ params }: { params: IParams }) => {
  const { data: reservation } = useReservationById(params.reservationId);

  if (reservation?.id) {
    return (
      <ClientOnly>
        <ReviewClient reservation={reservation} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <EmptyState
        title="Няма намерена резервация"
        subtitle="Изглежда, че не тази резервация не съществува."
      />
    </ClientOnly>
  );
};

export default ReviewPage;

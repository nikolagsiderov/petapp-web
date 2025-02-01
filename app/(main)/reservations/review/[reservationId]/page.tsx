import EmptyState from "@/app/components/EmptyState";
import ReviewClient from "@/app/components/pages/main/reservations/review/ReviewClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getReservationById } from "pawpal-fe-common/listings";
import webTokenGetter from "@/app/context/webTokenGetter";

interface IParams {
  reservationId?: string;
}

const ReviewPage = async ({ params }: { params: IParams }) => {
  if (params.reservationId) {
    const response = await getReservationById(
      webTokenGetter(),
      params.reservationId!
    );

    const reservation = response?.success ? response : null;

    if (reservation?.id) {
      return (
        <ClientOnly>
          <ReviewClient reservation={reservation} />
        </ClientOnly>
      );
    }
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

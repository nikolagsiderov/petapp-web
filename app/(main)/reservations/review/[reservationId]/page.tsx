import ReviewClient from "@/app/components/pages/main/reservations/review/ReviewClient";
import ClientOnly from "@/app/components/ClientOnly";

interface IParams {
  reservationId: string;
}

const ReviewPage = async ({ params }: { params: IParams }) => {
  return (
    <ClientOnly>
      <ReviewClient reservationId={params.reservationId} />
    </ClientOnly>
  );
};

export default ReviewPage;

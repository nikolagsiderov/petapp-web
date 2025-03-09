import ReviewClient from "@/app/components/pages/main/reservations/review/ReviewClient";
import ClientOnly from "@/app/components/ClientOnly";
import { ProtectedRoute } from "@/app/context/AuthContext";

interface IParams {
  reservationId: string;
}

const ReviewPage = async ({ params }: { params: IParams }) => {
  return (
    <ClientOnly>
      <ProtectedRoute>
        <ReviewClient reservationId={params.reservationId} />
      </ProtectedRoute>
    </ClientOnly>
  );
};

export default ReviewPage;

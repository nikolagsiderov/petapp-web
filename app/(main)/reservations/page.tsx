import ReservationsClient from "@/app/components/pages/main/reservations/ReservationsClient";
import ClientOnly from "@/app/components/ClientOnly";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const ReservationsPage = async () => {
  return (
    <ClientOnly>
      <ProtectedRoute>
        <ReservationsClient />
      </ProtectedRoute>
    </ClientOnly>
  );
};

export default ReservationsPage;

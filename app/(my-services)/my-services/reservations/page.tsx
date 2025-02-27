import ClientOnly from "@/app/components/ClientOnly";
import ReservationRequests from "@/app/components/pages/my-services/reservations/ReservationRequests";

const ReservationsPage = async () => {
  return (
    <ClientOnly>
      <ReservationRequests />
    </ClientOnly>
  );
};

export default ReservationsPage;

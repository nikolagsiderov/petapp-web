import ReservationsClient from "@/app/components/pages/main/reservations/ReservationsClient";
import ClientOnly from "@/app/components/ClientOnly";

const ReservationsPage = async () => {
  return (
    <ClientOnly>
      <ReservationsClient />
    </ClientOnly>
  );
};

export default ReservationsPage;

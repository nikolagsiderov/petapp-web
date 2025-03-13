"use client";

import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import MyServicesContainer from "@/app/components/MyServicesContainer";
import ReservationsTable from "@/app/components/pages/my-services/reservations/ReservationsTable";
import usePetSitterReservations from "@/app/context/TRQs/listings/usePetSitterReservations";
import { reservationStatuses } from "@nikolagsiderov/pawpal-fe-common/constants";
import { useTranslation } from "react-i18next";

const ReservationRequests = () => {
  const { t } = useTranslation();
  const { data: reservations } = usePetSitterReservations();

  const awaitingApproval = reservations?.filter(
    (request: any) => request.status === reservationStatuses.pending
  );

  if (!reservations || reservations.length === 0) {
    return <EmptyState />;
  }

  return (
    <MyServicesContainer>
      <div className="flex justify-between items-stretch flex-wrap mb-8">
        <Heading title={t("Reservations")} />
        <div className="font-light relative flex flex-wrap items-center my-2 lg:w-48">
          {t("Pending_requests")}: {awaitingApproval?.length}
        </div>
      </div>
      <ReservationsTable reservationRequests={reservations} />
    </MyServicesContainer>
  );
};

export default ReservationRequests;

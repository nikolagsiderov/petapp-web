"use client";

import { Reservation } from "pawpal-fe-types";
import Heading from "@/app/components/Heading";
import MyServicesContainer from "@/app/components/MyServicesContainer";
import ReservationsTable from "@/app/components/pages/my-services/reservations/ReservationsTable";
import { reservationStatuses } from "pawpal-fe-common/constants";

interface ReservationRequestsClientProps {
  reservationRequests: Reservation[];
}

const ReservationRequests: React.FC<ReservationRequestsClientProps> = ({
  reservationRequests,
}) => {
  const awaitingApproval = reservationRequests.filter(
    (request) => request.status === reservationStatuses.pending
  );

  return (
    <MyServicesContainer>
      <div className="flex justify-between items-stretch flex-wrap mb-8">
        <Heading
          title="Резервации"
          subtitle="Заявки за резервации, одобрени или чакащи одобрение"
        />
        <div className="font-light relative flex flex-wrap items-center my-2 lg:w-48">
          Брой на заявките чакащи одобрение: {awaitingApproval.length}
        </div>
      </div>
      <ReservationsTable reservationRequests={reservationRequests} />
    </MyServicesContainer>
  );
};

export default ReservationRequests;

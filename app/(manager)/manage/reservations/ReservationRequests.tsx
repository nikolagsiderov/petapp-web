"use client";

import { Reservation } from "@/app/types";
import Heading from "@/app/components/Heading";
import ManageContainer from "@/app/components/ManageContainer";
import ReservationsTable from "@/app/components/manage/ReservationsTable";

interface ReservationRequestsClientProps {
  reservationRequests: Reservation[];
}

const ReservationRequests: React.FC<ReservationRequestsClientProps> = ({
  reservationRequests,
}) => {
  // TODO: Create const status enums
  const awaitingApproval = reservationRequests.filter(
    (request) => request.status === "Pending"
  );

  return (
    <ManageContainer>
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
    </ManageContainer>
  );
};

export default ReservationRequests;

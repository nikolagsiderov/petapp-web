"use client";

import { Reservation } from "pawpal-fe-common/listings";
import ReservationsTableRows from "./ReservationsTableRows";

interface ReservationsTableProps {
  reservationRequests: Reservation[];
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservationRequests,
}) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-x-scroll mx-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
            <th className="pl-4 w-8"></th>
            <th className="text-start p-4 font-medium">№ на резервацията</th>
            <th className="text-start p-4 font-medium">Заявил</th>
            <th className="text-start p-4 font-medium">Статус</th>
            <th className="text-start p-4 font-medium">Заявени дати</th>
          </tr>
        </thead>

        <tbody>
          {reservationRequests.map((request, index) => {
            return (
              <ReservationsTableRows
                key={request.id}
                request={request}
                index={index}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;

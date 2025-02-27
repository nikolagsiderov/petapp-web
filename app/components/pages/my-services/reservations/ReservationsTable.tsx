"use client";

import { Reservation } from "pawpal-fe-common/listings-types";
import ReservationsTableRows from "./ReservationsTableRows";
import { useTranslation } from "react-i18next";

interface ReservationsTableProps {
  reservationRequests: Reservation[];
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservationRequests,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-x-scroll mx-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
            <th className="pl-4 w-8"></th>
            <th className="text-start p-4 font-medium">
              {t("Reservation_number")}
            </th>
            <th className="text-start p-4 font-medium">{t("Requested")}</th>
            <th className="text-start p-4 font-medium">{t("Status")}</th>
            <th className="text-start p-4 font-medium">
              {t("Requested_dates")}
            </th>
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

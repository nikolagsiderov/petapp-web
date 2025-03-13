"use client";

import { format } from "date-fns";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaThumbsUp } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { Reservation } from "@nikolagsiderov/pawpal-fe-common/listings-types";
import { reservationStatuses } from "@nikolagsiderov/pawpal-fe-common/constants";
import useUpdateReservationStatus from "@/app/context/TRQs/listings/mutations/useUpdateReservationStatus";
import { useTranslation } from "react-i18next";
import Avatar from "@/app/components/Avatar";

interface TableRowsProps {
  request: Reservation;
  index: number;
}

const ReservationsTableRows = ({ request, index }: TableRowsProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { mutate: updateReservationStatus } = useUpdateReservationStatus();

  const onApprove = useCallback(
    async (id: string) => {
      await updateReservationStatus({
        reservationId: id,
        status: reservationStatuses.accepted,
      });

      toast.success(t("Reservation_request_accepted"));
      router.refresh();
    },
    [router, updateReservationStatus]
  );

  const onCancel = useCallback(
    async (id: string) => {
      await updateReservationStatus({
        reservationId: id,
        status: reservationStatuses.rejected,
      });

      toast.success(t("Reservation_request_rejected"));
      router.refresh();
    },
    [router, updateReservationStatus]
  );

  const handleReservationDate = (request: Reservation) => {
    if (!request) {
      return null;
    }

    const start = new Date(request.fromDate);
    const end = new Date(request.toDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  };

  return (
    <tr
      id={`row-request-${request.id}`}
      className={`text-sm ${index % 2 ? "bg-slate-100" : "bg-white"}`}
    >
      <td className="pl-4 w-8 text-lg">
        {request.status === reservationStatuses.accepted ? (
          <div
            onClick={() => onCancel(request.id)}
            className="flex flex-row gap-1 justify-center items-center rounded-xl transition cursor-pointer py-1 px-2 bg-rose-500 hover:bg-rose-700 text-white"
          >
            <TiCancel size={24} />{" "}
            <span className="text-xs font-semibold uppercase">
              {t("Reject_request")}
            </span>
          </div>
        ) : (
          <div
            onClick={() => onApprove(request.id)}
            className="flex flex-row gap-2 justify-center items-center rounded-xl transition cursor-pointer py-2 px-4 bg-emerald-500 hover:bg-emerald-700 text-white"
          >
            <FaThumbsUp size={16} />{" "}
            <span className="text-xs font-semibold uppercase">
              {t("Accept_request")}
            </span>
          </div>
        )}
      </td>

      <td className="p-4 font-light">
        <span className="font-bold">#</span>
        {request.id}
      </td>

      <td className="p-4 flex items-center gap-3 overflow-hidden">
        <Avatar src={request.user.externalProfilePictureUrl} />
        <div>
          <span className="block mb-1 font-medium">
            {request.user.firstName} {request.user.lastName}
          </span>
          <span className="block text-xs text-slate-500">
            {request.user.email}
          </span>
        </div>
      </td>

      <td className="p-4">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded text-white ${
            request.status === reservationStatuses.accepted
              ? "bg-emerald-500"
              : "bg-amber-500"
          }`}
        >
          {request.status === reservationStatuses.accepted ? (
            <span>{t("Approved")}</span>
          ) : (
            <span>{t("Waiting_approval")}</span>
          )}
        </span>
      </td>

      <td className="p-4 font-light">{handleReservationDate(request)}</td>
    </tr>
  );
};

export default ReservationsTableRows;

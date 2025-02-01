"use client";

import { Reservation } from "pawpal-fe-types";
import { format } from "date-fns";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaThumbsUp } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { updateReservationStatus } from "pawpal-fe-common/listings";
import { reservationStatuses } from "pawpal-fe-common/constants";
import clientSideWebTokenGetter from "@/app/context/clientSideWebTokenGetter";

interface TableRowsProps {
  request: Reservation;
  index: number;
}

const ReservationsTableRows = ({
  request,
  index,
}: TableRowsProps) => {
  const router = useRouter();

  const onApprove = useCallback(
    async (id: string) => {
      const response = await updateReservationStatus(clientSideWebTokenGetter(), id, {
        status: reservationStatuses.accepted,
      });

      if (response?.success) {
        toast.success("Резервацията е одобрена!");
        router.refresh();
      } else {
        toast.error(`Резервацията не е одобрена: ${response?.message}`);
      }
    },
    [router]
  );

  const onCancel = useCallback(
    async (id: string) => {
      const response = await updateReservationStatus(clientSideWebTokenGetter(), id, {
        status: reservationStatuses.rejected,
      });

      if (response?.success) {
        toast.success("Резервацията е отменена!");
        router.refresh();
      } else {
        toast.error(`Резервацията не е отменена: ${response?.message}`);
      }
    },
    [router]
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
            <span className="text-xs font-semibold uppercase">Отмени</span>
          </div>
        ) : (
          <div
            onClick={() => onApprove(request.id)}
            className="flex flex-row gap-2 justify-center items-center rounded-xl transition cursor-pointer py-2 px-4 bg-emerald-500 hover:bg-emerald-700 text-white"
          >
            <FaThumbsUp size={16} />{" "}
            <span className="text-xs font-semibold uppercase">Одобри</span>
          </div>
        )}
      </td>

      <td className="p-4 font-light">
        <span className="font-bold">#</span>
        {request.id}
      </td>

      <td className="p-4 flex items-center gap-3 overflow-hidden">
        {/* // TODO: Add 'user' property in 'reservation' object, we need the person who made the reservation... */}
        {/* <Avatar src={request.user.image} /> */}
        <div>
          {/* <span className="block mb-1 font-medium">{request.user.name}</span> */}
          <span className="block text-xs text-slate-500">
            {/* {request.user.email} */}
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
            <span>Одобрена</span>
          ) : (
            <span>Чака одобрение</span>
          )}
        </span>
      </td>

      <td className="p-4 font-light">{handleReservationDate(request)}</td>
    </tr>
  );
};

export default ReservationsTableRows;

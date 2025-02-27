"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReservationStatusAsync } from "pawpal-fe-common/listings-api";
import { IUpdateReservationStatusPayload } from "pawpal-fe-common/listings-interfaces";
import toast from "react-hot-toast";
import usePetSitterReservations from "../usePetSitterReservations";
import { useTranslation } from "react-i18next";
import { reservationStatuses } from "pawpal-fe-common/constants";

const useUpdateReservationStatus = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async (payload: IUpdateReservationStatusPayload) => {
      updateReservationStatusAsync(payload);
      return payload.status;
    },
    onSuccess: (status: string) => {
      queryClient.invalidateQueries({
        queryKey: [usePetSitterReservations.name],
      });

      if (status === reservationStatuses.accepted) {
        toast.success(t("Reservation_request_accepted"));
      } else {
        toast.success(t("Reservation_request_rejected"));
      }
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useUpdateReservationStatus;

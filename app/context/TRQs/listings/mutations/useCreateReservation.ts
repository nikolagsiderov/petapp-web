"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReservationAsync } from "pawpal-fe-common/listings-api";
import { ICreateReservationPayload } from "pawpal-fe-common/listings-interfaces";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import useListingById from "../useListingById";

const useCreateReservation = (onSuccessCallback?: () => void) => {
  const { t } = useTranslation();
  const { handleError } = useGlobalErrorHandler();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ICreateReservationPayload) => {
      await createReservationAsync(payload);
      return payload.listingId;
    },
    onSuccess: (listingId: string) => {
      queryClient.invalidateQueries({
        queryKey: [useListingById.name, listingId],
      });
      toast.success(t("Reservation_request_sent_successfully"));

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useCreateReservation;

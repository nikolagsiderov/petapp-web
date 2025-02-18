"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IUpdateReservationStatusPayload,
  updateReservationStatusAsync,
} from "pawpal-fe-common/listings";
import toast from "react-hot-toast";
import usePetSitterReservations from "../usePetSitterReservations";

const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async (payload: IUpdateReservationStatusPayload) =>
      updateReservationStatusAsync(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [usePetSitterReservations.name],
      });
      toast.success("Статуса на резервацията е успешно променен");
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useUpdateReservationStatus;

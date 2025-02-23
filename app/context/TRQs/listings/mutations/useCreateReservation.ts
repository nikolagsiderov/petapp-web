"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { createReservationAsync } from "pawpal-fe-common/listings-api";
import { ICreateReservationPayload } from "pawpal-fe-common/listings-interfaces";
import toast from "react-hot-toast";

const useCreateReservation = () => {
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async (payload: ICreateReservationPayload) =>
      createReservationAsync(payload),
    onSuccess: () => {
      toast.success("Успешно изпратена заявка за резервация!");
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useCreateReservation;

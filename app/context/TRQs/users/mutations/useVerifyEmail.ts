"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyEmailAsync } from "pawpal-fe-common/users-api";
import { IVerifyEmailPayload } from "pawpal-fe-common/users-interfaces";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";

const useVerifyEmail = () => {
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async (payload: IVerifyEmailPayload) =>
      await verifyEmailAsync(payload),
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useVerifyEmail;

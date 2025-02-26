"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerAsync } from "pawpal-fe-common/users-api";
import { IRegisterPayload } from "pawpal-fe-common/users-interfaces";

const useRegister = (onSuccessCallback?: () => void) => {
  const { handleError } = useGlobalErrorHandler();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: IRegisterPayload) => {
      await registerAsync(payload);
      return payload.email;
    },
    onSuccess: (email: string) => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      
      router.replace(`/verification-required?email=${email}`);
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useRegister;

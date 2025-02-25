"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerAsync } from "pawpal-fe-common/users-api";
import { IRegisterPayload } from "pawpal-fe-common/users-interfaces";

const useRegister = () => {
  const { handleError } = useGlobalErrorHandler();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: IRegisterPayload) => {
      registerAsync(payload);
      return payload.email;
    },
    onSuccess: (email: string) => {
      router.replace(`/auth/verification_required?email=${email}`);
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useRegister;

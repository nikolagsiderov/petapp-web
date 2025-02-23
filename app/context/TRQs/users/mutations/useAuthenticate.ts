"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authenticateAsync } from "pawpal-fe-common/users-api";
import { IAuthenticatePayload } from "pawpal-fe-common/users-interfaces";
import useAuthentication from "../../useAuthentication";
import useCurrentUser from "../useCurrentUser";

const useAuthenticate = () => {
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: IAuthenticatePayload) =>
      await authenticateAsync(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useAuthentication.name],
      });
      queryClient.invalidateQueries({
        queryKey: [useCurrentUser.name],
      });
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useAuthenticate;

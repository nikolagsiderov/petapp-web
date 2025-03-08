"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticateAsync } from "pawpal-fe-common/users-api";
import { IAuthenticatePayload } from "pawpal-fe-common/users-interfaces";
import useCurrentUser from "../useCurrentUser";
import { useAuth } from "@/app/context/AuthContext";
import useListings from "../../listings/useListings";

const useAuthenticate = (
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
) => {
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();
  const { setAuthStatus } = useAuth();

  return useMutation({
    mutationFn: async (payload: IAuthenticatePayload) =>
      await authenticateAsync(payload),
    onSuccess: () => {
      setAuthStatus(true);
      queryClient.invalidateQueries({
        queryKey: [useCurrentUser.name],
      });
      queryClient.invalidateQueries({
        queryKey: [useListings.name],
      });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      if (onErrorCallback) {
        onErrorCallback();
      }

      handleError(error ?? null);
    },
  });
};

export default useAuthenticate;

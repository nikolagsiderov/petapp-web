"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticateWithGoogleAsync } from "pawpal-fe-common/users-api";
import { IAuthenticateWithGooglePayload } from "pawpal-fe-common/users-interfaces";
import useCurrentUser from "../useCurrentUser";
import useListings from "../../listings/useListings";
import { useAuth } from "@/app/context/AuthContext";

const useAuthenticateWithGoogle = (
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
) => {
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();
  const { setAuthStatus } = useAuth();

  return useMutation({
    mutationFn: async (payload: IAuthenticateWithGooglePayload) =>
      await authenticateWithGoogleAsync(payload),
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

export default useAuthenticateWithGoogle;

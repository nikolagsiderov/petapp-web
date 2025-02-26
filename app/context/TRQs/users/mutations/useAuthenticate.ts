"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticateAsync } from "pawpal-fe-common/users-api";
import { IAuthenticatePayload } from "pawpal-fe-common/users-interfaces";
import useCurrentUser from "../useCurrentUser";
import { useAuth } from "@/app/context/AuthContext";
import useListings from "../../listings/useListings";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useAuthenticate = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();
  const { setAuthStatus } = useAuth();
  const router = useRouter();

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
      handleError(error ?? null);
    },
  });
};

export default useAuthenticate;

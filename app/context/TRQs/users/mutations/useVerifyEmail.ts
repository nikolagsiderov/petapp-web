import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyEmailAsync } from "pawpal-fe-common/users-api";
import useCurrentUser from "../useCurrentUser";
import { IVerifyEmailPayload } from "pawpal-fe-common/users-interfaces";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";

const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async (payload: IVerifyEmailPayload) =>
      verifyEmailAsync(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useCurrentUser.name],
      });
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useVerifyEmail;

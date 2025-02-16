import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  authenticateWithGoogleAsync,
  IAuthenticateWithGooglePayload,
} from "pawpal-fe-common/users";
import useAuthentication from "../../useAuthentication";
import useCurrentUser from "../useCurrentUser";

const useAuthenticateWithGoogle = () => {
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: IAuthenticateWithGooglePayload) =>
      await authenticateWithGoogleAsync(payload),
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

export default useAuthenticateWithGoogle;

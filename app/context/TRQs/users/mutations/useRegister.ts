"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IRegisterPayload, registerAsync } from "pawpal-fe-common/users";
import useAuthentication from "../../useAuthentication";
import useCurrentUser from "../useCurrentUser";
import toast from "react-hot-toast";

const useRegister = () => {
  const { handleError } = useGlobalErrorHandler();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: IRegisterPayload) => registerAsync(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [useAuthentication.name],
      });
      queryClient.invalidateQueries({
        queryKey: [useCurrentUser.name],
      });
      router.replace("/(tabs)/profile");
      toast.success("Успешно се регистрирахте!");
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useRegister;

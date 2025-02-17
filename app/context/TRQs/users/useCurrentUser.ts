"use client";

import { getCurrentUserAsync } from "pawpal-fe-common/users";
import useAuthentication from "../useAuthentication";
import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";

const useCurrentUser = () => {
  const { handleError } = useGlobalErrorHandler();
  const { data: authenticated } = useAuthentication();

  return useQuery({
    queryKey: ["useCurrentUser"],
    queryFn: async () => {
      try {
        const res = await getCurrentUserAsync();
        return res;
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: !!authenticated,
  });
};

export default useCurrentUser;

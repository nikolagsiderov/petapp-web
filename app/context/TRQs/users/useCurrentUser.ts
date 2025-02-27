"use client";

import { getCurrentUserAsync } from "pawpal-fe-common/users-api";
import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useAuth } from "../../AuthContext";

const useCurrentUser = () => {
  const { handleError } = useGlobalErrorHandler();
  const { authStatus } = useAuth();

  return useQuery({
    queryKey: [useCurrentUser.name],
    queryFn: async () => {
      try {
        const res = await getCurrentUserAsync();
        return res;
      } catch (error) {
        handleError(error);
      }
    },
    enabled: authStatus,
  });
};

export default useCurrentUser;

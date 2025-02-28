"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getCurrentUserListingsAsync } from "pawpal-fe-common/listings-api";
import { useAuth } from "../../AuthContext";

const useCurrentUserListings = () => {
  const { authStatus } = useAuth();
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [useCurrentUserListings.name],
    queryFn: async () => {
      try {
        return await getCurrentUserListingsAsync();
      } catch (error) {
        handleError(error);
      }
    },
    enabled: authStatus,
  });
};

export default useCurrentUserListings;

"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getCurrentUserListingsAsync } from "pawpal-fe-common/listings-api";
import useAuthentication from "../useAuthentication";

const useCurrentUserListings = () => {
  const { data: authenticated } = useAuthentication();
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [useCurrentUserListings.name],
    queryFn: async () => {
      try {
        const res = await getCurrentUserListingsAsync();
        return res;
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: !!authenticated,
  });
};

export default useCurrentUserListings;

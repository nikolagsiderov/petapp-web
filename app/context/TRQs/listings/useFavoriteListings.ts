"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getFavoriteListings } from "pawpal-fe-common/listings-api";
import useAuthentication from "../useAuthentication";

const useFavoriteListings = () => {
  const { data: authenticated } = useAuthentication();
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [useFavoriteListings.name],
    queryFn: async () => {
      try {
        const res = await getFavoriteListings();
        return res;
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: !!authenticated,
  });
};

export default useFavoriteListings;

"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getFavoriteListings } from "pawpal-fe-common/listings-api";
import { useAuth } from "../../AuthContext";

const useFavoriteListings = () => {
  const { authStatus } = useAuth();
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
    enabled: authStatus,
  });
};

export default useFavoriteListings;

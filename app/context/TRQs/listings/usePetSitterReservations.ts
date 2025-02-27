"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getPetsitterReservationsAsync } from "pawpal-fe-common/listings-api";
import { useAuth } from "../../AuthContext";

const usePetSitterReservations = () => {
  const { authStatus } = useAuth();
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [usePetSitterReservations.name],
    queryFn: async () => {
      try {
        const res = await getPetsitterReservationsAsync();
        return res;
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: authStatus,
  });
};

export default usePetSitterReservations;

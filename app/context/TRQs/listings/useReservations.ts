"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getReservationsAsync } from "pawpal-fe-common/listings-api";
import { useAuth } from "../../AuthContext";

const useReservations = () => {
  const { authStatus } = useAuth();
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [useReservations.name],
    queryFn: async () => {
      try {
        return await getReservationsAsync();
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: authStatus,
  });
};

export default useReservations;

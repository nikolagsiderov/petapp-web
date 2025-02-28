"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getReservationByIdAsync } from "pawpal-fe-common/listings-api";
import { useAuth } from "../../AuthContext";

const useReservationById = (id: string) => {
  const { authStatus } = useAuth();
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [useReservationById.name, id],
    queryFn: async () => {
      try {
        return await getReservationByIdAsync(id);
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: authStatus,
  });
};

export default useReservationById;

"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getReservationsAsync } from "pawpal-fe-common/listings-api";
import useAuthentication from "../useAuthentication";

const useReservations = () => {
  const { data: authenticated } = useAuthentication();
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [useReservations.name],
    queryFn: async () => {
      try {
        const res = await getReservationsAsync();
        return res;
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: !!authenticated,
  });
};

export default useReservations;

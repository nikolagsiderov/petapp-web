"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getReservationByIdAsync } from "pawpal-fe-common/listings";
import useAuthentication from "../useAuthentication";

const useReservationById = (id: string) => {
  const { data: authenticated } = useAuthentication();
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [useReservationById.name, id],
    queryFn: async () => {
      try {
        const res = await getReservationByIdAsync(id);
        return res;
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: !!authenticated,
  });
};

export default useReservationById;

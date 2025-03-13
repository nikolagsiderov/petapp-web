"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getListingByIdAsync } from "@nikolagsiderov/pawpal-fe-common/listings-api";

const useListingById = (id: string) => {
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [useListingById.name, id],
    queryFn: async () => {
      try {
        return await getListingByIdAsync(id);
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: true,
  });
};

export default useListingById;

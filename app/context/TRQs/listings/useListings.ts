"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getListingsAsync } from "@nikolagsiderov/pawpal-fe-common/listings-api";
import { IGetListingsParams } from "@nikolagsiderov/pawpal-fe-common/listings-interfaces";

const useListings = (params: IGetListingsParams) => {
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [useListings.name, params],
    queryFn: async () => {
      try {
        return await getListingsAsync(params);
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: true,
  });
};

export default useListings;

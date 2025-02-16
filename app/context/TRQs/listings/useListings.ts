import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getListingsAsync, IGetListingsParams } from "pawpal-fe-common/listings";

const useListings = (searchParams: IGetListingsParams) => {
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [useListings.name],
    queryFn: async () => {
      try {
        return await getListingsAsync(searchParams);
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: true,
  });
};

export default useListings;
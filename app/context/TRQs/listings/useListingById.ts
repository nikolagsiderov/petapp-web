import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getListingByIdAsync } from "pawpal-fe-common/listings";

const useListingById = (id: string) => {
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [useListingById.name, id],
    queryFn: async () => {
      try {
        const res = await getListingByIdAsync(id);
        return res;
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: true,
  });
};

export default useListingById;

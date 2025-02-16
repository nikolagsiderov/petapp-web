import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createListingAsync,
  ICreateListingPayload,
} from "pawpal-fe-common/listings";
import toast from "react-hot-toast";
import useListings from "../useListings";

const useCreateListing = () => {
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async (payload: ICreateListingPayload) =>
      createListingAsync(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [useListings.name] });
      toast.success("Успешно създадохте обява");
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useCreateListing;

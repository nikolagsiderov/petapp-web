"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeListingFromFavoritesAsync } from "pawpal-fe-common/favorites-api";
import toast from "react-hot-toast";
import useFavoriteListings from "../../listings/useFavoriteListings";

const useRemoveListingFromFavorites = () => {
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async (targetItemId: string) =>
      removeListingFromFavoritesAsync(targetItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [useFavoriteListings.name] });
      toast.success("Обявата е премахната от запазени обяви");
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useRemoveListingFromFavorites;

"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addListingToFavoritesAsync } from "pawpal-fe-common/favorites";
import toast from "react-hot-toast";
import useFavoriteListings from "../../listings/useFavoriteListings";

const useAddListingToFavorites = () => {
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async (targetItemId: string) =>
      addListingToFavoritesAsync(targetItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [useFavoriteListings.name] });
      toast.success("Обявата е добавена към запазени обяви");
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useAddListingToFavorites;

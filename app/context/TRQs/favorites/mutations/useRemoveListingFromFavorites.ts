"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeListingFromFavoritesAsync } from "pawpal-fe-common/favorites-api";
import toast from "react-hot-toast";
import useFavoriteListings from "../../listings/useFavoriteListings";
import { useTranslation } from "react-i18next";

const useRemoveListingFromFavorites = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async (targetItemId: string) =>
      await removeListingFromFavoritesAsync(targetItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [useFavoriteListings.name] });
      toast.success(t("The_listing_has_been_removed_from_favorites"));
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useRemoveListingFromFavorites;

"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeListingFromFavoritesAsync } from "@nikolagsiderov/pawpal-fe-common/favorites-api";
import useFavoriteListings from "../../listings/useFavoriteListings";
import { Listing } from "@nikolagsiderov/pawpal-fe-common/listings-types";
import useListings from "../../listings/useListings";

const useRemoveListingFromFavorites = () => {
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async ({
      listing,
      updateUseListingsQuery,
    }: {
      listing: Listing;
      updateUseListingsQuery?: boolean;
    }) => {
      await removeListingFromFavoritesAsync(listing.id);
      return { listing, updateUseListingsQuery };
    },
    onSuccess: ({ updateUseListingsQuery }) => {
      queryClient.invalidateQueries({ queryKey: [useFavoriteListings.name] });

      if (!!!updateUseListingsQuery) {
        queryClient.invalidateQueries({ queryKey: [useListings.name] });
      }
    },
    onError: (error, { listing }) => {
      listing.isFavorite = true;
      handleError(error ?? null);
    },
  });
};

export default useRemoveListingFromFavorites;

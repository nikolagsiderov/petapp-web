"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addListingToFavoritesAsync } from "pawpal-fe-common/favorites-api";
import useFavoriteListings from "../../listings/useFavoriteListings";
import { Listing } from "pawpal-fe-common/listings-types";
import useListings from "../../listings/useListings";

const useAddListingToFavorites = () => {
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
      await addListingToFavoritesAsync(listing.id);
      return { listing, updateUseListingsQuery };
    },
    onSuccess: ({ updateUseListingsQuery }) => {
      queryClient.invalidateQueries({ queryKey: [useFavoriteListings.name] });

      if (updateUseListingsQuery) {
        queryClient.invalidateQueries({ queryKey: [useListings.name] });
      }
    },
    onError: (error, { listing }) => {
      listing.isFavorite = false;
      handleError(error ?? null);
    },
  });
};

export default useAddListingToFavorites;

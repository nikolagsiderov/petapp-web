"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useLoginModal from "./useLoginModal";
import useAuthentication from "../context/TRQs/useAuthentication";
import useAddListingToFavorites from "../context/TRQs/favorites/mutations/useAddListingToFavorites";
import useRemoveListingFromFavorites from "../context/TRQs/favorites/mutations/useRemoveListingFromFavorites";
import { Listing } from "pawpal-fe-common/listings";

interface IUseFavorite {
  listing: Listing;
}

const useFavorite = ({ listing }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: isAuthenticated } = useAuthentication();
  const { mutate: post } = useAddListingToFavorites();
  const { mutate: remove } = useRemoveListingFromFavorites();

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!isAuthenticated) {
        return loginModal.onOpen();
      }

      if (listing.isFavorite) {
        remove(listing.id);
      } else {
        post(listing.id);
      }

      router.refresh();
    },
    [loginModal, router, isAuthenticated, listing, post, remove]
  );

  return {
    toggleFavorite,
  };
};

export default useFavorite;

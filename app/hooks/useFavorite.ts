"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useLoginModal from "./useLoginModal";
import useAddListingToFavorites from "../context/TRQs/favorites/mutations/useAddListingToFavorites";
import useRemoveListingFromFavorites from "../context/TRQs/favorites/mutations/useRemoveListingFromFavorites";
import { Listing } from "pawpal-fe-common/listings-types";
import { useAuth } from "../context/AuthContext";

interface IUseFavorite {
  listing: Listing;
}

const useFavorite = ({ listing }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { authStatus } = useAuth();
  const { mutate: post } = useAddListingToFavorites();
  const { mutate: remove } = useRemoveListingFromFavorites();

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!authStatus) {
        return loginModal.onOpen();
      }

      if (listing.isFavorite) {
        remove(listing.id);
      } else {
        post(listing.id);
      }

      router.refresh();
    },
    [loginModal, router, authStatus, listing, post, remove]
  );

  return {
    toggleFavorite,
  };
};

export default useFavorite;

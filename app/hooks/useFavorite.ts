"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useLoginModal from "./useLoginModal";
import useAddListingToFavorites from "../context/TRQs/favorites/mutations/useAddListingToFavorites";
import useRemoveListingFromFavorites from "../context/TRQs/favorites/mutations/useRemoveListingFromFavorites";
import { Listing } from "@nikolagsiderov/pawpal-fe-common/listings-types";
import { useAuth } from "../context/AuthContext";

interface IUseFavorite {
  listing: Listing;
  updateUseListingsQuery?: boolean;
}

const useFavorite = ({ listing, updateUseListingsQuery }: IUseFavorite) => {
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
        listing.isFavorite = false;
        remove({ listing, updateUseListingsQuery });
      } else {
        listing.isFavorite = true;
        post({ listing, updateUseListingsQuery });
      }

      router.refresh();
    },
    [
      loginModal,
      router,
      authStatus,
      listing,
      updateUseListingsQuery,
      post,
      remove,
    ]
  );

  return {
    toggleFavorite,
  };
};

export default useFavorite;

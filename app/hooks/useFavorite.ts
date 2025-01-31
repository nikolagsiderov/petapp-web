"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { get, post, remove } from "pawpal-fe-common/favorites";
import { User } from "pawpal-fe-types";
import clientSideWebTokenGetter from "../context/clientSideWebTokenGetter";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let response;

        const favoritesResponse = await get(clientSideWebTokenGetter());
        const favorites = favoritesResponse?.success ? favoritesResponse : null;

        if (favorites?.collection.length > 0) {
          if (
            favorites?.collection.some(
              (fav: any) => fav.targetItemId === listingId
            )
          ) {
            response = await remove(clientSideWebTokenGetter(), listingId);
          } else {
            response = await post(clientSideWebTokenGetter(), listingId);
          }
        }

        router.refresh();

        if (response?.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Нещо се обърка.");
      }
    },
    [currentUser, listingId, loginModal, router]
  );

  return {
    toggleFavorite,
  };
};

export default useFavorite;

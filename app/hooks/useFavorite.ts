"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { get, post, remove } from "pawpal-fe-favorites-server-actions";
import { User } from "pawpal-fe-types";

interface IUseFavorite {
  token?: string | null;
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ token, listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser || !token) {
        return loginModal.onOpen();
      }

      try {
        let response;

        const favorites = await get(token);

        if (favorites?.collection.length > 0) {
          if (
            favorites?.collection.some(
              (fav: any) => fav.targetItemId === listingId
            )
          ) {
            response = await remove(token, listingId);
          } else {
            response = await post(token, listingId);
          }
        }

        router.refresh();

        if (response.success) {
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

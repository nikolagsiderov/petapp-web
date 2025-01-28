import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { User } from "pawpal-fe-common";
import useLoginModal from "./useLoginModal";
import { get, post, remove } from "../actions/favorites/client";

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

        const favorites = await get();

        if (favorites?.collection.length > 0) {
          if (
            favorites?.collection.some(
              (fav: any) => fav.targetItemId === listingId
            )
          ) {
            response = await remove(listingId);
          } else {
            response = await post(listingId);
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

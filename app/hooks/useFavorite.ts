import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { User } from "pawpal-fe-common";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavorited = useMemo(() => {
    // const list = currentUser?.favoriteIds || []; // TODO: Handle after favorites microservice implementations...
    const list: any = [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        const response = await request();
        router.refresh();

        if (response.data.created) {
          toast.success(response.data.message);
        } else if (response.data.deleted) {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Нещо се обърка.");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;

"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Listing, User } from "pawpal-fe-types";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  listing: Listing;
  currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listing,
  currentUser,
}) => {
  const { toggleFavorite } = useFavorite({
    listingId: listing.id,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={listing.isFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;

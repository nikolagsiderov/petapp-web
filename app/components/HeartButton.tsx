"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";
import { Listing } from "pawpal-fe-common/listings-types";

interface HeartButtonProps {
  listing: Listing;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listing }) => {
  const { toggleFavorite } = useFavorite({
    listing: listing,
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

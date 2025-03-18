"use client";

import Image from "next/image";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { Listing } from "@nikolagsiderov/pawpal-fe-common/listings-types";
import { usePawPalImage } from "@nikolagsiderov/pawpal-fe-common/hooks";

interface ListingHeadProps {
  listing: Listing;
}

const ListingHead: React.FC<ListingHeadProps> = ({ listing }) => {
  const { getImageSrc } = usePawPalImage();

  return (
    <>
      <Heading subtitle={listing.address} />
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={
            getImageSrc(listing.imageRelativePaths[0]) ??
            "/images/listing-default-image.png"
          }
          fill
          className="object-cover"
          alt="Image"
          sizes="(min-width: 1px) 100vw"
          placeholder="blur"
          blurDataURL={
            getImageSrc(listing.imageRelativePaths[0]) ??
            "/images/listing-default-image.png"
          }
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton listing={listing} updateUseListingsQuery />
        </div>
      </div>
    </>
  );
};

export default ListingHead;

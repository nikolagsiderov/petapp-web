"use client";

import Image from "next/image";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { Listing } from "@nikolagsiderov/pawpal-fe-common/listings-types";

interface ListingHeadProps {
  address: string;
  imageSrc: string;
  listing: Listing;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  address,
  imageSrc,
  listing,
}) => {
  return (
    <>
      <Heading subtitle={address} />
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
          src={imageSrc ? imageSrc : "/images/listing-default-image.png"}
          fill
          className="object-cover"
          alt="Image"
          sizes="(min-width: 1px) 100vw"
          placeholder="blur"
          blurDataURL={imageSrc ?? "/images/listing-default-image.png"}
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

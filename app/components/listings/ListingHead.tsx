"use client";

import Image from "next/image";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { Listing } from "pawpal-fe-common/listings";

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
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton listing={listing} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;

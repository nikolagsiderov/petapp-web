"use client";

import Image from "next/image";
import { Listing } from "pawpal-fe-types";
import { User } from "next-auth";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  address: string;
  imageSrc: string;
  listing: Listing;
  currentUser?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  address,
  imageSrc,
  listing,
  currentUser,
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
          <HeartButton listing={listing} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;

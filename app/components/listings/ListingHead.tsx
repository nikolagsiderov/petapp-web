"use client";

import Image from "next/image";
import { User } from "@/app/types";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  address: string;
  imageSrc: string;
  id: string;
  currentUser?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  address,
  imageSrc,
  id,
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
          src={imageSrc ? imageSrc : "/images/review page background.png"}
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
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;

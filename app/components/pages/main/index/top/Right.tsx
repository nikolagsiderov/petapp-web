"use client";

import Image from "next/image";

const Right = () => {
  return (
    <div className="col-span-1">
      <div className="flex flex-col w-full">
        <div className="aspect-square w-full relative overflow-hidden">
          <Image
            alt="Listing"
            src={"/images/dog banner.png"}
            className="object-cover h-full w-full"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Right;

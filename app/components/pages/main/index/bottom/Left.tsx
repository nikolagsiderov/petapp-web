"use client";

import Image from "next/image";

const LeftBottom = () => {
  return (
    <div className="col-span-1">
      <div className="flex flex-col w-full">
        <div className="aspect-[3/4] h-full relative overflow-hidden">
          <Image
            alt="Listing"
            src={"/images/mobileapp.png"}
            className="object-cover h-full w-full"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default LeftBottom;

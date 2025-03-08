"use client";

import ListingCard from "@/app/components/listings/cards/ListingCard";
import { Listing } from "pawpal-fe-common/listings-types";

const Right = ({ listings }: { listings: Listing[] | null | undefined }) => {
  return (
    <div className="pb-20">
      <div className="hidden lg:block lg:col-span-1 lg:relative lg:mb-16">
        <div className="flex flex-col lg:px-2 gap-8">
          {listings?.map((listing: any) => (
            <ListingCard horizontal key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
      <div className="lg:hidden">
        <div className="flex flex-col gap-8">
          {listings?.map((listing: any) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Right;

"use client";

import ListingCard from "@/app/components/listings/ListingCard";
import { Listing } from "pawpal-fe-common/listings-types";

interface RightProps {
  listings?: Array<Listing> | null;
}

const Right: React.FC<RightProps> = ({ listings }) => {
  return (
    <div className="pb-20">
      <div className="hidden lg:block lg:col-span-1 lg:relative lg:mb-16">
        <div className="flex flex-col lg:px-2 gap-8">
          {listings?.map((listing: any) => (
            <ListingCard
              horizontal
              key={listing.id}
              data={listing}
              listingUserName={`${listing.user.firstName} ${listing.user.lastName}`}
            />
          ))}
        </div>
      </div>
      <div className="lg:hidden">
        <div className="flex flex-col gap-8">
          {listings?.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
              listingUserName={`${listing.user.firstName} ${listing.user.lastName}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Right;

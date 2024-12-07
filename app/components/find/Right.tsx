"use client";

import ListingCard from "@/app/components/listings/ListingCard";
import { SafeUser } from "@/app/types";

interface RightProps {
  listings?: any;
  currentUser?: SafeUser | null | undefined;
}

const Right: React.FC<RightProps> = ({ listings, currentUser }) => {
  return (
    <div className="pb-20">
      <div className="hidden lg:block lg:col-span-1 lg:relative lg:mb-16">
        <div className="flex flex-col lg:px-2 gap-8">
          {listings?.map((listing: any) => (
            <ListingCard
              horizontal
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              listingUserName={listing.user.name}
            />
          ))}
        </div>
      </div>
      <div className="lg:hidden">
        <div className="flex flex-col gap-8">
          {listings?.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              listingUserName={listing.user.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Right;

"use client";

import ListingCard from "@/app/components/listings/ListingCard";
import { SafeUser } from "../../types";

interface ListViewProps {
  listings?: any;
  currentUser?: SafeUser | null | undefined;
}

const ListView: React.FC<ListViewProps> = ({ listings, currentUser }) => {
  return (
    <div
      className="
            lg:pt-64 pt-72 pb-20
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
    >
      {listings?.map((listing: any) => (
        <ListingCard
          currentUser={currentUser}
          key={listing.id}
          data={listing}
          listingUserName={listing.user.name}
        />
      ))}
    </div>
  );
};

export default ListView;

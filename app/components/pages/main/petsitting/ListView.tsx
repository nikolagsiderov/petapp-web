"use client";

import ListingCard from "@/app/components/listings/cards/ListingCard";
import { Listing } from "pawpal-fe-common/listings-types";

interface ListViewProps {
  listings?: Listing[];
}

const ListView: React.FC<ListViewProps> = ({ listings }) => {
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
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default ListView;

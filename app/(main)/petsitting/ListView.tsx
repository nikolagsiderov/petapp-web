"use client";

import ListingCard from "@/app/components/listings/ListingCard";
import { User } from "pawpal-fe-types";

interface ListViewProps {
  token?: string | null;
  listings?: any;
  currentUser?: User | null | undefined;
}

const ListView: React.FC<ListViewProps> = ({
  token,
  listings,
  currentUser,
}) => {
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
          token={token}
          currentUser={currentUser}
          key={listing.id}
          data={listing}
          listingUserName={`${listing.user.firstName} ${listing.user.lastName}`}
        />
      ))}
    </div>
  );
};

export default ListView;

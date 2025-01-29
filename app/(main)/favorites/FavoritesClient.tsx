"use client";

import { Listing } from "pawpal-fe-types";
import { User } from "next-auth";
import Heading from "@/app/components/Heading";
import MainContainer from "@/app/components/MainContainer";
import ListingCard from "@/app/components/listings/ListingCard";

interface FavoritesClientProps {
  listings: Array<Listing> | null | undefined | any;
  currentUser?: User | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <MainContainer>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          lg:pt-28 pt-36 pb-24
        "
      >
        <Heading title="Запазени обяви" subtitle="Списък със запазени обяви!" />
        <div
          className="
          mt-10
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
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              listingUserName={`${listing.user.firstName} ${listing.user.lastName}`}
            />
          ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default FavoritesClient;

"use client";

import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import MainContainer from "@/app/components/MainContainer";
import ListingCard from "@/app/components/listings/ListingCard";
import useFavoriteListings from "@/app/context/TRQs/listings/useFavoriteListings";
import { useTranslation } from "react-i18next";

const FavoritesClient = () => {
  const { t } = useTranslation();
  const { data: listings } = useFavoriteListings();

  if (!listings || listings.length === 0) {
    return (
      <EmptyState
        title={t("No_favorite_listings")}
        subtitle={t("It_looks_like_you_havent_added_any_listings_to_favorites")}
      />
    );
  }

  return (
    <MainContainer>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          lg:pt-28 pt-36 pb-24
        "
      >
        <Heading title={t("Favorite_listings")} />
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
              key={listing.id}
              data={listing}
              listingUserName={`${listing.user.firstName} ${listing.user.lastName}`}
              fromFavoritesPage
            />
          ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default FavoritesClient;

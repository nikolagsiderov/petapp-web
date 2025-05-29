"use client";

import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import FavoriteListingCard from "@/app/components/listings/cards/FavoriteListingCard";
import Loader from "@/app/components/Loader";
import MainContainer from "@/app/components/MainContainer";
import useFavoriteListings from "@/app/context/TRQs/listings/useFavoriteListings";
import useListings from "@/app/context/TRQs/listings/useListings";
import { useTranslation } from "react-i18next";

const FavoritesClient = () => {
  const { t } = useTranslation();
  const { data: listings, isLoading } = useListings();

  if (isLoading) {
    return <Loader />;
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
          {listings &&
            listings.map((listing: any) => (
              <FavoriteListingCard key={listing.id} listing={listing} />
            ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default FavoritesClient;

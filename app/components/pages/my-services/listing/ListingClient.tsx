"use client";

import EmptyState from "@/app/components/EmptyState";
import ListingEdit from "@/app/components/listings/ListingEdit";
import MyServicesContainer from "@/app/components/MyServicesContainer";
import useCurrentUserListings from "@/app/context/TRQs/listings/useCurrentUserListings";

const ListingClient = () => {
  const { data: listings } = useCurrentUserListings();

  if (!listings || listings.length === 0) {
    return <EmptyState />;
  }

  return (
    <MyServicesContainer>
      {listings[0] && <ListingEdit listing={listings[0]} />}
    </MyServicesContainer>
  );
};

export default ListingClient;

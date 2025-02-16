"use client";

import ListingEdit from "@/app/components/listings/ListingEdit";
import MyServicesContainer from "@/app/components/MyServicesContainer";
import { Listing } from "pawpal-fe-common/listings";

interface ListingClientProps {
  listing: Listing | null | undefined;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing }) => {
  return (
    <MyServicesContainer>
      {listing && <ListingEdit listing={listing} />}
    </MyServicesContainer>
  );
};

export default ListingClient;

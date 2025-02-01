"use client";

import { Listing } from "pawpal-fe-types";
import ListingEdit from "@/app/components/listings/ListingEdit";
import MyServicesContainer from "@/app/components/MyServicesContainer";

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

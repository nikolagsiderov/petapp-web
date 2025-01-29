"use client";

import { Listing } from "pawpal-fe-types";
import ListingEdit from "@/app/components/listings/ListingEdit";
import ManageContainer from "@/app/components/ManageContainer";

interface ListingClientProps {
  listing: Listing | null | undefined;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing }) => {
  return (
    <ManageContainer>
      {listing && <ListingEdit listing={listing} />}
    </ManageContainer>
  );
};

export default ListingClient;

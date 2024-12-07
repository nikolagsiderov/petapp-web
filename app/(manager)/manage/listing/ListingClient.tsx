"use client";

import { SafeListing, SafeUser } from "@/app/types";
import ListingEdit from "@/app/components/listings/ListingEdit";
import ManageContainer from "@/app/components/ManageContainer";

interface ListingClientProps {
  listing: SafeListing | null | undefined;
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  return (
    <ManageContainer>
      {listing && <ListingEdit listing={listing} />}
    </ManageContainer>
  );
};

export default ListingClient;

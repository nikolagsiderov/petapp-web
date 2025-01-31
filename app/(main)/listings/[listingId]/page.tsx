import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import BecomeSitterModal from "@/app/components/modals/BecomeSitterModal";
import { getById } from "pawpal-fe-common/listings";
import { getCurrentUser } from "pawpal-fe-common/users";
import webTokenGetter from "@/app/context/webTokenGetter";
import { User } from "pawpal-fe-types";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const response = await getCurrentUser(webTokenGetter());
  const currentUser: User | null = response?.success ? response : null;
  const listing = await getById(params.listingId);
  // const reviews = await getReviews(params); // TODO: Implement reviews microservice in BE

  if (!listing || !listing.success) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <BecomeSitterModal />
      <ListingClient currentUser={currentUser} listing={listing} />
    </ClientOnly>
  );
};

export default ListingPage;

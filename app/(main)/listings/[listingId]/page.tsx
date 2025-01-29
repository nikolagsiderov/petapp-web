import getCurrentUser from "@/app/actions/users/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import BecomeSitterModal from "@/app/components/modals/BecomeSitterModal";
import { getById } from "pawpal-fe-listings-server-actions";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getById(params.listingId);
  // const reviews = await getReviews(params); // TODO: Implement reviews microservice in BE
  const currentUser = await getCurrentUser();

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
      <ListingClient
        listing={listing}
        reviews={[]} // TODO: After implementation of reviews microservice, replace with actual reviews data...
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;

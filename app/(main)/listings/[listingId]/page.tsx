import getCurrentUser from "@/app/actions/users/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import BecomeSitterModal from "@/app/components/modals/BecomeSitterModal";
import { getListingById } from "@/app/actions/listings-legacy/getActions";
import { getReservations, getReviews } from "@/app/actions/reservations/getActions";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const reviews = await getReviews(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
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
        reservations={reservations}
        reviews={reviews}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;

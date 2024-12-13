import getCurrentUser from "@/app/actions/users/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import BecomeSitterModal from "@/app/components/modals/BecomeSitterModal";
import {
  getReservations,
  getReviews,
} from "@/app/actions/reservations/getActions";
import { getById } from "@/app/actions/listings/client";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getById(params.listingId);
  console.log(JSON.stringify(listing));
  const reservations = await getReservations(params);
  const reviews = await getReviews(params);
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
        reservations={reservations}
        reviews={reviews}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;

import EmptyState from "@/app/components/EmptyState";
import ListingClient from "@/app/components/pages/main/listings/ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import BecomeSitterModal from "@/app/components/modals/BecomeSitterModal";
import useListingById from "@/app/context/TRQs/listings/useListingById";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { data: listing } = useListingById(params.listingId);
  // const reviews = await getReviews(params); // TODO: GET reviews and utilize

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
      <ListingClient listing={listing} />
    </ClientOnly>
  );
};

export default ListingPage;

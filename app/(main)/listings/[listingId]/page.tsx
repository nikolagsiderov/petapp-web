import ListingClient from "@/app/components/pages/main/listings/ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import BecomeSitterModal from "@/app/components/modals/BecomeSitterModal";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  return (
    <ClientOnly>
      <BecomeSitterModal />
      <ListingClient id={params.listingId} />
    </ClientOnly>
  );
};

export default ListingPage;

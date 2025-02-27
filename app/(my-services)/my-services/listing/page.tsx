import ListingClient from "@/app/components/pages/my-services/listing/ListingClient";
import ClientOnly from "@/app/components/ClientOnly";

const MyListingsPage = async () => {
  return (
    <ClientOnly>
      <ListingClient />
    </ClientOnly>
  );
};

export default MyListingsPage;

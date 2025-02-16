import EmptyState from "@/app/components/EmptyState";
import ListingClient from "@/app/components/pages/my-services/listing/ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import useCurrentUserListings from "@/app/context/TRQs/listings/useCurrentUserListings";

const MyListingsPage = async () => {
  const { data: listings } = useCurrentUserListings();

  if (!listings || listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Нямате обявя"
          subtitle="Все още не е имплементирана възможността да си създадеш от тук."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listings[0]} />
    </ClientOnly>
  );
};

export default MyListingsPage;

import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getListingByUserId } from "@/app/actions/listings/getActions";

const MyListingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Нямате достъп" subtitle="Влезте в своя профил" />
      </ClientOnly>
    );
  }

  const listing = await getListingByUserId({ userId: currentUser.id });

  if (!listing) {
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
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default MyListingsPage;

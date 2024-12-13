import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import { get } from "@/app/actions/listings/client";

const MyListingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Нямате достъп" subtitle="Влезте в своя профил" />
      </ClientOnly>
    );
  }

  const response = await get({ userId: currentUser.id });
  const listing =
    response.success & response.collection ? response.collection[0] : null;

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
      <ListingClient listing={listing} />
    </ClientOnly>
  );
};

export default MyListingsPage;

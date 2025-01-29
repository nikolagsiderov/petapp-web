import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import { get } from "pawpal-fe-listings-server-actions";

const MyListingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    const response = await get({ userId: currentUser.id });
    const listing = response.success
      ? response.collection
        ? response.collection[0]
        : null
      : null;

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
  }

  return (
    <ClientOnly>
      <EmptyState
        title="Нямате достъп"
        subtitle="Няма достъп до тази страница."
      />
    </ClientOnly>
  );
};

export default MyListingsPage;

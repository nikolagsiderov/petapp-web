import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import { get } from "pawpal-fe-common/listings";
import { redirect } from "next/navigation";
import { getCurrentUser } from "pawpal-fe-common/users";
import webTokenGetter from "@/app/context/webTokenGetter";

const MyListingsPage = async () => {
  const response = await getCurrentUser(webTokenGetter());
  const currentUser = response?.success ? response : null;

  if (!response?.success || !currentUser) {
    redirect("/auth");
  }

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

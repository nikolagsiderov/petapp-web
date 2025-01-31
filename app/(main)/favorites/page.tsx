import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "./FavoritesClient";
import ClientOnly from "@/app/components/ClientOnly";
import { get } from "pawpal-fe-common/favorites";
import { getById } from "pawpal-fe-common/listings";
import { redirect } from "next/navigation";
import { getCurrentUser } from "pawpal-fe-common/users";
import webTokenGetter from "@/app/context/webTokenGetter";
import { User } from "pawpal-fe-types";

const FavoritesPage = async () => {
  const currentUserResponse = await getCurrentUser(webTokenGetter());
  const currentUser: User | null = currentUserResponse?.success
    ? currentUserResponse
    : null;

  if (!currentUserResponse?.success || !currentUser) {
    redirect("/auth");
  }

  const response = await get(webTokenGetter());
  let listings: any = [];

  if (response.success && response.collection.length > 0) {
    for (let i = 0; i < response?.collection.length; i++) {
      const favItem = response?.collection[i];
      const listing = await getById(favItem.targetItemId);
      const fullItem = { ...favItem, ...listing };
      listings.push(fullItem);
    }
  }

  if (response.collection.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Нямате запазени обяви"
          subtitle="Изглежда, че не сте запазили обяви."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;

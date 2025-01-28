import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "./FavoritesClient";
import ClientOnly from "@/app/components/ClientOnly";
import { get } from "@/app/actions/favorites/client";
import { getById } from "@/app/actions/listings/client";
import getCurrentUser from "@/app/actions/users/getCurrentUser";

const FavoritesPage = async () => {
  const response = await get();
  let listings: any = [];
  const currentUser = await getCurrentUser();

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

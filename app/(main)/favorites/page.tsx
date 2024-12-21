import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import FavoritesClient from "./FavoritesClient"; // TODO: Uncomment after BE implementations...
import ClientOnly from "@/app/components/ClientOnly";

const ListingPage = async () => {
  // TODO: Once the BE handles favorites, request current user favorite listings collection
  // LEGACY: const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  // TODO: Once the BE handles favorites, uncomment here...
  // if (listings.length === 0) {
  return (
    <ClientOnly>
      <EmptyState
        title="Нямате запазени обяви"
        subtitle="Изглежда, че не сте запазили обяви."
      />
    </ClientOnly>
  );
  // TODO: Once the BE handles favorites, uncomment here...
  // }

  // TODO: Once the BE handles favorites, uncomment here...
  // return (
  //   <ClientOnly>
  //     <FavoritesClient listings={listings} currentUser={currentUser} />
  //   </ClientOnly>
  // );
};

export default ListingPage;

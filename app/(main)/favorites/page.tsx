import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "@/app/components/pages/main/favorites/FavoritesClient";
import ClientOnly from "@/app/components/ClientOnly";
import useFavoriteListings from "@/app/context/TRQs/listings/useFavoriteListings";

const FavoritesPage = async () => {
  const { data: listings } = useFavoriteListings();

  if (listings && listings.length === 0) {
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
      <FavoritesClient listings={listings} />
    </ClientOnly>
  );
};

export default FavoritesPage;

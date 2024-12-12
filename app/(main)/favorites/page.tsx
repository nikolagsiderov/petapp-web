import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import FavoritesClient from "./FavoritesClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getFavoriteListings } from "../../actions/listings-legacy/getActions";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
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

export default ListingPage;

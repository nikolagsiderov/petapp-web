import FavoritesClient from "@/app/components/pages/main/favorites/FavoritesClient";
import ClientOnly from "@/app/components/ClientOnly";

const FavoritesPage = async () => {
  return (
    <ClientOnly>
      <FavoritesClient />
    </ClientOnly>
  );
};

export default FavoritesPage;

import FavoritesClient from "@/app/components/pages/main/favorites/FavoritesClient";
import ClientOnly from "@/app/components/ClientOnly";
import { ProtectedRoute } from "@/app/context/AuthContext";

const FavoritesPage = async () => {
  return (
    <ClientOnly>
      <ProtectedRoute>
        <FavoritesClient />
      </ProtectedRoute>
    </ClientOnly>
  );
};

export default FavoritesPage;

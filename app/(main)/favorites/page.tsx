import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "./FavoritesClient";
import ClientOnly from "@/app/components/ClientOnly";
import { get } from "pawpal-fe-favorites-server-actions";
import { getById } from "pawpal-fe-listings-server-actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

async function getSession() {
  return await getServerSession(authOptions);
}

const FavoritesPage = async () => {
  const session = await getSession();
  const currentUser = session?.user;

  if (session === null) {
    redirect("/auth");
  }

  const response = await get(currentUser!.jwt);
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
      <FavoritesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default FavoritesPage;

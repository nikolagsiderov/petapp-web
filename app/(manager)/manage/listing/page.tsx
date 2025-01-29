import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import { get } from "pawpal-fe-listings-server-actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

async function getSession() {
  return await getServerSession(authOptions);
}

const MyListingsPage = async () => {
  const session = await getSession();
  const currentUser = session?.user;

  if (session === null) {
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

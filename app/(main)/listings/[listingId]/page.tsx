import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import BecomeSitterModal from "@/app/components/modals/BecomeSitterModal";
import { getById } from "pawpal-fe-listings-server-actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface IParams {
  listingId: string;
}

async function getSession() {
  return await getServerSession(authOptions);
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const session = await getSession();
  const listing = await getById(params.listingId);
  // const reviews = await getReviews(params); // TODO: Implement reviews microservice in BE
  const currentUser = session?.user;

  if (!listing || !listing.success) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <BecomeSitterModal />
      <ListingClient
        listing={listing}
        reviews={[]} // TODO: After implementation of reviews microservice, replace with actual reviews data...
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;

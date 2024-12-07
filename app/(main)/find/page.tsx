import ClientOnly from "@/app/components/ClientOnly";
import FindClient from "./FindClient";
import FindModal from "@/app/components/modals/FindModal";
import EmptyState from "@/app/components/EmptyState";
import {
  getListings,
  IListingsParams,
} from "@/app/actions/listings/getActions";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface FindProps {
  searchParams: IListingsParams;
}

const FindPage = async ({ searchParams }: FindProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <FindModal />
        <div className="lg:pt-32 pt-48">
          <EmptyState showReset />
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FindModal />
      <FindClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FindPage;

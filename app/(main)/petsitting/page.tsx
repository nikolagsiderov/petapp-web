import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import SearchModal from "../../components/modals/SearchModal";
import BecomeSitterModal from "../../components/modals/BecomeSitterModal";
import PetSittingClient from "./PetSittingClient";
import { IListingsParams, getListings } from "../../actions/listings/getActions";

export const dynamic = "force-dynamic";

interface PetSittingProps {
  searchParams: IListingsParams;
}

const PetSittingPage = async ({ searchParams }: PetSittingProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <SearchModal />
        <BecomeSitterModal />
        <div className="lg:pt-32 pt-48">
          <EmptyState showReset />
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <SearchModal />
      <BecomeSitterModal />
      <PetSittingClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PetSittingPage;

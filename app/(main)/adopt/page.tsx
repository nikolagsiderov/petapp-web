import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import FilterPetSittersModal from "../../components/modals/FilterPetSittersModal";
import BecomeSitterModal from "../../components/modals/BecomeSitterModal";
import {
  IListingsParams,
  getListings,
} from "../../actions/listings/getActions";
import AdoptClient from "./AdoptClient";

export const dynamic = "force-dynamic";

interface AdoptProps {
  searchParams: IListingsParams;
}

const AdoptPage = async ({ searchParams }: AdoptProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <FilterPetSittersModal />
        <BecomeSitterModal />
        <div className="lg:pt-32 pt-48">
          <EmptyState showReset />
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FilterPetSittersModal />
      <BecomeSitterModal />
      <AdoptClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default AdoptPage;

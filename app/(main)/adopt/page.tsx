import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import FilterPetSittersModal from "../../components/modals/FilterPetSittersModal";
import { IGetParams, get } from "../../actions/listings/client";
import AdoptClient from "./AdoptClient";

export const dynamic = "force-dynamic";

interface AdoptProps {
  searchParams: IGetParams;
}

const AdoptPage = async ({ searchParams }: AdoptProps) => {
  const response = await get(searchParams);
  const listings = response.success ? response.collection : [];
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <FilterPetSittersModal />
        <div className="lg:pt-32 pt-48">
          <EmptyState showReset />
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FilterPetSittersModal />
      <AdoptClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default AdoptPage;

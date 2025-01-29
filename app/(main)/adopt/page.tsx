import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import FilterPetSittersModal from "../../components/modals/FilterPetSittersModal";
import { IGetParams } from "../../actions/listings/client";

export const dynamic = "force-dynamic";

interface AdoptProps {
  searchParams: IGetParams;
}

const AdoptPage = async ({ searchParams }: AdoptProps) => {
  return (
    <ClientOnly>
      <FilterPetSittersModal />
      <div className="lg:pt-32 pt-48">
        <EmptyState showReset />
      </div>
    </ClientOnly>
  );
};

export default AdoptPage;

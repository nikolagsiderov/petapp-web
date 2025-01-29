import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import FilterPetSittersModal from "../../components/modals/FilterPetSittersModal";

export const dynamic = "force-dynamic";

const AdoptPage = async () => {
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

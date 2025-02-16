import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import FilterPetSittersModal from "../../components/modals/FilterPetSittersModal";
import BecomeSitterModal from "../../components/modals/BecomeSitterModal";
import PetSittingClient from "@/app/components/pages/main/petsitting/PetSittingClient";
import { Dayjs } from "dayjs";
import useListings from "@/app/context/TRQs/listings/useListings";

export const dynamic = "force-dynamic";

interface PetSittingProps {
  searchParams: {
    userId?: string | null;
    fromDate?: Dayjs | null;
    toDate?: Dayjs | null;
    address?: string | null;
    addressLocale?: string | null;
    category?: string | null;
  };
}

const PetSittingPage = async ({ searchParams }: PetSittingProps) => {
  const { data: listings } = useListings(searchParams);

  if (!listings || listings.length === 0) {
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
      <PetSittingClient listings={listings} />
    </ClientOnly>
  );
};

export default PetSittingPage;

import ClientOnly from "@/app/components/ClientOnly";
import FilterPetSittersModal from "../../components/modals/FilterPetSittersModal";
import BecomeSitterModal from "../../components/modals/BecomeSitterModal";
import PetSittingClient from "@/app/components/pages/main/petsitting/PetSittingClient";
import { Dayjs } from "dayjs";

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
  return (
    <ClientOnly>
      <FilterPetSittersModal />
      <BecomeSitterModal />
      <PetSittingClient params={searchParams} />
    </ClientOnly>
  );
};

export default PetSittingPage;

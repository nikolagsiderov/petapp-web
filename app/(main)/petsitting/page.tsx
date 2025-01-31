import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import FilterPetSittersModal from "../../components/modals/FilterPetSittersModal";
import BecomeSitterModal from "../../components/modals/BecomeSitterModal";
import PetSittingClient from "./PetSittingClient";
import { get } from "pawpal-fe-common/listings";
import { getCurrentUser } from "pawpal-fe-common/users";
import { Dayjs } from "dayjs";
import webTokenGetter from "@/app/context/webTokenGetter";

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
  const currentUserResponse = await getCurrentUser(webTokenGetter());
  const currentUser = currentUserResponse?.success ? currentUserResponse : null;
  const response = await get(searchParams);
  const listings = response.success ? response.collection : [];

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
      <PetSittingClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PetSittingPage;

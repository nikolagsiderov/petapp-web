import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import FilterPetSittersModal from "../../components/modals/FilterPetSittersModal";
import BecomeSitterModal from "../../components/modals/BecomeSitterModal";
import PetSittingClient from "./PetSittingClient";
import { IGetParams, get } from "pawpal-fe-listings-server-actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

interface PetSittingProps {
  searchParams: IGetParams;
}

async function getSession() {
  return await getServerSession(authOptions);
}

const PetSittingPage = async ({ searchParams }: PetSittingProps) => {
  const session = await getSession();
  const currentUser = session?.user;
  const response = await get(searchParams);
  const listings = response.success ? response.collection : [];

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <FilterPetSittersModal />
        <BecomeSitterModal currentUser={currentUser} />
        <div className="lg:pt-32 pt-48">
          <EmptyState showReset />
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FilterPetSittersModal />
      <BecomeSitterModal currentUser={currentUser} />
      <PetSittingClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default PetSittingPage;

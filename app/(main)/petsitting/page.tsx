import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import FilterPetSittersModal from "../../components/modals/FilterPetSittersModal";
import BecomeSitterModal from "../../components/modals/BecomeSitterModal";
import PetSittingClient from "./PetSittingClient";
import { IGetParams, get } from "../../actions/listings/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

interface PetSittingProps {
  searchParams: IGetParams;
}

export async function getSession() {
  return await getServerSession(authOptions);
}

const PetSittingPage = async ({ searchParams }: PetSittingProps) => {
  const session = await getSession();
  const response = await get(searchParams);
  const listings = response.success ? response.collection : [];
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
      <PetSittingClient
        token={session?.user.jwt}
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default PetSittingPage;

import ClientOnly from "@/app/components/ClientOnly";
import FindClient from "./FindClient";
import FindModal from "@/app/components/modals/FindModal";
import getCurrentUser from "@/app/actions/users/getCurrentUser";

const FindPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <FindModal />
      <FindClient currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FindPage;

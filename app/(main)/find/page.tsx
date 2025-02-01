import ClientOnly from "@/app/components/ClientOnly";
import FindClient from "@/app/components/pages/main/find/FindClient";
import FindModal from "@/app/components/modals/FindModal";

const FindPage = async () => {
  return (
    <ClientOnly>
      <FindModal />
      <FindClient />
    </ClientOnly>
  );
};

export default FindPage;

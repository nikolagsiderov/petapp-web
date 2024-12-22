import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ManageClient from "./ManageClient";
import ClientOnly from "@/app/components/ClientOnly";

const MyListingsPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <ManageClient currentUser={currentUser} />
    </ClientOnly>
  );
};

export default MyListingsPage;

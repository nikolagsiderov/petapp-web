import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import ManageClient from "./ManageClient";
import ClientOnly from "@/app/components/ClientOnly";

const MyListingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Нямате достъп" subtitle="Влезте в своя профил" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ManageClient currentUser={currentUser} />
    </ClientOnly>
  );
};

export default MyListingsPage;

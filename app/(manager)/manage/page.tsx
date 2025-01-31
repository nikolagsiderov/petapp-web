import ManageClient from "./ManageClient";
import ClientOnly from "@/app/components/ClientOnly";
import webTokenGetter from "@/app/context/webTokenGetter";
import { redirect } from "next/navigation";
import { getCurrentUser } from "pawpal-fe-common/users";

const ManagePage = async () => {
  const response = await getCurrentUser(webTokenGetter());
  const currentUser = response?.success ? response : null;

  if (!response?.success || !currentUser) {
    redirect("/auth");
  }

  return (
    <ClientOnly>
      <ManageClient currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ManagePage;

import ManageClient from "./ManageClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

async function getSession() {
  return await getServerSession(authOptions);
}

const ManagePage = async () => {
  const session = await getSession();
  const currentUser = session?.user;

  if (session === null) {
    redirect("/auth");
  }

  return (
    <ClientOnly>
      <ManageClient currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ManagePage;

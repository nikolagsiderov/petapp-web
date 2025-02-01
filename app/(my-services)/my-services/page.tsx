import MyServicesClient from "@/app/components/pages/my-services/MyServicesClient";
import ClientOnly from "@/app/components/ClientOnly";
import webTokenGetter from "@/app/context/webTokenGetter";
import { redirect } from "next/navigation";
import { getCurrentUser } from "pawpal-fe-common/users";

const MyServicesPage = async () => {
  const response = await getCurrentUser(webTokenGetter());
  const currentUser = response?.success ? response : null;

  if (!response?.success || !currentUser) {
    redirect("/auth");
  }

  return (
    <ClientOnly>
      <MyServicesClient currentUser={currentUser} />
    </ClientOnly>
  );
};

export default MyServicesPage;

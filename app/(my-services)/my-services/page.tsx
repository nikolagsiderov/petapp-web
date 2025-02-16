import MyServicesClient from "@/app/components/pages/my-services/MyServicesClient";
import ClientOnly from "@/app/components/ClientOnly";
import useCurrentUser from "@/app/context/TRQs/users/useCurrentUser";

const MyServicesPage = async () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <ClientOnly>
      <MyServicesClient currentUser={currentUser} />
    </ClientOnly>
  );
};

export default MyServicesPage;

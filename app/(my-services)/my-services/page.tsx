import MyServicesClient from "@/app/components/pages/my-services/MyServicesClient";
import ClientOnly from "@/app/components/ClientOnly";

const MyServicesPage = async () => {
  return (
    <ClientOnly>
      <MyServicesClient />
    </ClientOnly>
  );
};

export default MyServicesPage;

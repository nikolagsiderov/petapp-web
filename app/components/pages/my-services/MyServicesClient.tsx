"use client";

import Heading from "@/app/components/Heading";
import MyServicesContainer from "@/app/components/MyServicesContainer";
import useCurrentUser from "@/app/context/TRQs/users/useCurrentUser";
import Image from "next/image";

const MyServicesClient = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <MyServicesContainer>
      <Heading
        title={`Здравейте, ${
          currentUser?.firstName + " " + currentUser?.lastName
        }!`}
        subtitle="Началната страница на управленския панел все още не е имплементирана."
      />
      <Image
        className="fixed bottom-0 right-0 md:w-auto w-1/2"
        width={256}
        height={100}
        alt="Cat repairman"
        src={"/images/cat repairman.png"}
      />
    </MyServicesContainer>
  );
};

export default MyServicesClient;

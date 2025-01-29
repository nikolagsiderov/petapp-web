"use client";

import { User } from "pawpal-fe-types";
import Heading from "@/app/components/Heading";
import ManageContainer from "@/app/components/ManageContainer";
import Image from "next/image";

interface ManageClientProps {
  currentUser?: User | null;
}

const ManageClient: React.FC<ManageClientProps> = ({ currentUser }) => {
  return (
    <ManageContainer>
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
    </ManageContainer>
  );
};

export default ManageClient;

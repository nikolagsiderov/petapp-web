"use client";

import MainContainer from "@/app/components/MainContainer";
import ListView from "./ListView";
import { Listing, User } from "../../types";

interface AdoptClientProps {
  currentUser?: User | null | undefined;
  listings?: Array<Listing> | null | undefined | any;
}

const AdoptClient: React.FC<AdoptClientProps> = ({ currentUser, listings }) => {
  return (
    <MainContainer>
      <ListView currentUser={currentUser} listings={listings} />
    </MainContainer>
  );
};

export default AdoptClient;

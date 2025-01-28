"use client";

import MainContainer from "@/app/components/MainContainer";
import MapView from "./MapView";
import { User } from "pawpal-fe-common";

interface FindClientProps {
  currentUser?: User | null | undefined;
}

const FindClient: React.FC<FindClientProps> = ({ currentUser }) => {
  return (
    <MainContainer>
      <MapView currentUser={currentUser} />
    </MainContainer>
  );
};

export default FindClient;

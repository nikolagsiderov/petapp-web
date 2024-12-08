"use client";

import MainContainer from "@/app/components/MainContainer";
import MapView from "./MapView";
import { SafeUser } from "../../types";

interface FindClientProps {
  currentUser?: SafeUser | null | undefined;
}

const FindClient: React.FC<FindClientProps> = ({ currentUser }) => {
  return (
    <MainContainer>
      <MapView currentUser={currentUser} />
    </MainContainer>
  );
};

export default FindClient;

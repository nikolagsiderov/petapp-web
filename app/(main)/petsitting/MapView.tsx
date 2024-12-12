"use client";

import Left from "../../components/petsitting/Left";
import Right from "../../components/petsitting/Right";
import { User } from "../../types";

interface MapViewProps {
  listings?: any;
  currentUser?: User | null | undefined;
}

const MapView: React.FC<MapViewProps> = ({ listings, currentUser }) => {
  return (
    <div className="pt-64 gap-8 lg:grid lg:grid-cols-3">
      <Left listings={listings} />
      <Right listings={listings} currentUser={currentUser} />
    </div>
  );
};

export default MapView;

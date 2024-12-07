"use client";

import Left from "../../components/find/Left";
import Right from "../../components/find/Right";
import { SafeUser } from "../../types";

interface MapViewProps {
  listings?: any;
  currentUser?: SafeUser | null | undefined;
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

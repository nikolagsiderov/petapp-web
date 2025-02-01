"use client";

import Left from "./Left";
import Right from "./Right";
import { User } from "pawpal-fe-types";

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

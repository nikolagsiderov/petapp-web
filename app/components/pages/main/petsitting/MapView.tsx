"use client";

import { Listing } from "pawpal-fe-common/listings";
import Left from "./Left";
import Right from "./Right";

interface MapViewProps {
  listings?: Listing[];
}

const MapView: React.FC<MapViewProps> = ({ listings }) => {
  return (
    <div className="pt-64 gap-8 lg:grid lg:grid-cols-3">
      <Left listings={listings} />
      <Right listings={listings} />
    </div>
  );
};

export default MapView;

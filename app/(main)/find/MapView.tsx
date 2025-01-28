"use client";

import Left from "../../components/find/Left";
import Right from "../../components/find/Right";
import { User } from "pawpal-fe-common";

interface MapViewProps {
  currentUser?: User | null | undefined;
}

const MapView: React.FC<MapViewProps> = ({ currentUser }) => {
  return (
    <div className="pt-64 gap-8 lg:grid lg:grid-cols-3">
      <Left />
      <Right currentUser={currentUser} />
    </div>
  );
};

export default MapView;

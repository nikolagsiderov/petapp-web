"use client";

import Left from "../../components/find/Left";
import Right from "../../components/find/Right";
import { SafeUser } from "../../types";

interface MapViewProps {
  currentUser?: SafeUser | null | undefined;
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

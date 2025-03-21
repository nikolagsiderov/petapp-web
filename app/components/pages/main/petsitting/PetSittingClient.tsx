"use client";

import MainContainer from "@/app/components/MainContainer";
import ListView from "./ListView";
import MapView from "./MapView";
import { FaMapLocationDot, FaListUl } from "react-icons/fa6";
import { useState } from "react";
import { IGetListingsParams } from "@nikolagsiderov/pawpal-fe-common/listings-interfaces";
import useListings from "@/app/context/TRQs/listings/useListings";
import EmptyState from "@/app/components/EmptyState";
import Loader from "@/app/components/Loader";

interface PetSittingClientProps {
  params: IGetListingsParams;
}

const PetSittingClient: React.FC<PetSittingClientProps> = ({ params }) => {
  const { data: listings, isLoading } = useListings(params);
  const [mapView, setMapView] = useState(true);

  const toggleView = () => {
    setMapView(!mapView);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!listings || listings.length === 0) {
    return (
      <div className="lg:pt-32 pt-48">
        <EmptyState showReset />
      </div>
    );
  }

  return (
    <MainContainer>
      <div className="hidden lg:block right-12 fixed z-10 bottom-16 justify-center items-center">
        <div
          onClick={toggleView}
          className="drop-shadow-lg cursor-pointer flex flex-row gap-1 justify-center items-center rounded-full hover:opacity-100 opacity-75 transition w-full bg-rose-500 font-light text-xs p-4 text-white"
        >
          {!mapView ? (
            <div className="flex flex-row justify-center items-center gap-2">
              <FaMapLocationDot size={20} className="fill-white" />
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-2">
              <FaListUl size={20} className="fill-white" />
            </div>
          )}
        </div>
      </div>

      {!mapView && <ListView listings={listings} />}
      {mapView && <MapView listings={listings} />}
    </MainContainer>
  );
};

export default PetSittingClient;

"use client";

import { Listing } from "pawpal-fe-common";
import { Circle, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Heading from "../Heading";

interface ListingMapProps {
  listing: Listing;
}

const ListingMap: React.FC<ListingMapProps> = ({ listing }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCPASOspif-cElvaiBWxsuLwAHKq9YyKbs",
    libraries: ["places"],
  });

  return isLoaded ? (
    <div className="flex flex-col gap-8 mb-12 lg:mb-0">
      <hr />
      <Heading subtitle={listing.address} />
      <GoogleMap
        mapContainerClassName="w-full h-[36rem] rounded-2xl"
        center={{
          lat: listing.latitude + 0.001,
          lng: listing.longitude - 0.001,
        }}
        zoom={15}
        options={{
          streetViewControl: false,
          draggable: false,
          zoomControl: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
        }}
      >
        <Circle
          center={{
            lat: listing.latitude + 0.001,
            lng: listing.longitude - 0.001,
          }}
          radius={300}
          options={{
            strokeColor: "#fb7185",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#fb7185",
            fillOpacity: 0.2,
          }}
        />
      </GoogleMap>
      <div className="text-xs">
        * Локацията на картата е ориентировъчна. Точният адрес ще бъде показан
        след резервация.
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ListingMap;

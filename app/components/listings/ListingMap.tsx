"use client";

import { Circle, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Heading from "../Heading";
import { Listing } from "@nikolagsiderov/pawpal-fe-common/listings-types";
import { mapsStyle } from "@nikolagsiderov/pawpal-fe-common/constants";
import { useTranslation } from "react-i18next";

interface ListingMapProps {
  listing: Listing;
}

const ListingMap: React.FC<ListingMapProps> = ({ listing }) => {
  const { t } = useTranslation();
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
          disableDefaultUI: true,
          styles: mapsStyle,
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
        {t(
          "The_location_on_the_map_is_approximate_The_exact_address_will_be_displayed_after_reservation"
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ListingMap;

"use client";

import {
  GoogleMap,
  Libraries,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { mapsStyle } from "@nikolagsiderov/pawpal-fe-common/constants";
import { Listing } from "@nikolagsiderov/pawpal-fe-common/listings-types";
import { useState, useEffect, useMemo } from "react";
import EmptyState from "@/app/components/EmptyState";

interface LeftProps {
  listings?: Listing[];
}

const Left: React.FC<LeftProps> = ({ listings }) => {
  const [userLocation, setUserLocation] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  const handleMapSelect = (listingId: string) => {
    router.push(`/listings/${listingId}`);
  };

  const centerCoords = { lat: 42.7587, lng: 25.2058 };

  const libraries = useMemo<Libraries>(() => ["places"], []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries,
  });

  if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return isLoaded ? (
      <div className="lg:col-span-2 lg:relative mb-12 lg:mb-0">
        <div className="lg:sticky lg:top-[16rem]">
          <GoogleMap
            mapContainerClassName="w-full h-[36rem] rounded-2xl"
            center={userLocation || centerCoords}
            zoom={userLocation ? 15 : 7.2}
            options={{
              streetViewControl: false,
              gestureHandling: "cooperative",
              minZoom: 7.2,
              styles: mapsStyle,
            }}
          >
            {listings?.map((listing: Listing) => {
              return (
                <div key={listing.id}>
                  <MarkerF
                    icon={{
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 10,
                    }}
                    // TODO: Set offsets using a randomize algorithm
                    position={{
                      lat: listing.latitude + 0.001, // This '+ 0.001' is to set a small offset of the circle center, not to expose the actual listing address
                      lng: listing.longitude - 0.001, // This '+ 0.001' is to set a small offset of the circle center, not to expose the actual listing address
                    }}
                    label={{
                      text: `${listing.price.toFixed(2)} лв`,
                      color: "white",
                      fontSize: "14px",
                      className:
                        "bg-rose-500 font-bold py-2 px-3 rounded-full cursor-pointer",
                    }}
                    onClick={() => handleMapSelect(listing.id)}
                  ></MarkerF>
                </div>
              );
            })}
          </GoogleMap>
        </div>
      </div>
    ) : (
      <></>
    );
  }

  return (
    <EmptyState
      title="Environment variable 'GOOGLE_MAPS_API_KEY' is missing"
      subtitle="Please provide a valid 'GOOGLE_MAPS_API_KEY' in the environment variables"
    />
  );
};

export default Left;

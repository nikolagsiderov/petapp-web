"use client";

import { GoogleMap, Libraries, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect, useMemo } from "react";
import { mapsStyle } from "@nikolagsiderov/pawpal-fe-common/constants";

const Left = () => {
  const [userLocation, setUserLocation] = useState<any>(null);

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

  const centerCoords = { lat: 42.7587, lng: 25.2058 };

  const libraries = useMemo<Libraries>(() => ["places"], []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCPASOspif-cElvaiBWxsuLwAHKq9YyKbs",
    libraries,
  });

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
        ></GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Left;

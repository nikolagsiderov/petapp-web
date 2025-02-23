"use client";

import { Circle, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Heading from "../Heading";
import { Listing } from "pawpal-fe-common/listings-types";

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
          styles: [
            {
              featureType: "administrative",
              elementType: "labels.text.fill",
              stylers: [
                {
                  lightness: 50,
                },
              ],
            },
            {
              featureType: "administrative.country",
              elementType: "geometry",
              stylers: [
                {
                  lightness: 50,
                },
                {
                  hue: "#000",
                },
              ],
            },
            {
              featureType: "landscape",
              stylers: [
                {
                  hue: "#e6f3d6",
                },
                {
                  saturation: 43.400000000000006,
                },
                {
                  lightness: 37.599999999999994,
                },
                {
                  gamma: 1,
                },
              ],
            },
            {
              featureType: "water",
              elementType: "all",
              stylers: [
                {
                  color: "#eaf6f8",
                },
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#eaf6f8",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [
                {
                  lightness: 50,
                },
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#e6f3d6",
                },
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "labels.text",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
          ],
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

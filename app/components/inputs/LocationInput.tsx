"use client";

import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useState } from "react";
import toast from "react-hot-toast";
import parseGooglePlacesPublicAddress from "@/app/hooks/parseGooglePlacesPublicAddress";

export type LocationValue = {
  address: string;
  lat: number;
  lng: number;
};

interface LocationInputProps {
  onChange: (locationValue: LocationValue) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onChange }) => {
  const [searchResult, setSearchResult] = useState<any>(null);
  const [privateAddress, setPrivateAddress] = useState<any>(null);
  const [publicAddress, setPublicAddress] = useState<string>("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCPASOspif-cElvaiBWxsuLwAHKq9YyKbs",
    libraries: ["places"],
  });

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "bg" },
    },
  });

  function onLoad(autocomplete: any) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();

      setPrivateAddress(place.formatted_address);
      parseGooglePlacesPublicAddress({ googlePlace: place, setPublicAddress });
      handleSelect();
    } else {
      toast.error("Моля въведете и изберете адрес.");
    }
  }

  const handleSelect = async () => {
    setValue(privateAddress, false);
    clearSuggestions();

    if (privateAddress !== null) {
      const results = await getGeocode({ address: privateAddress });
      const { lat, lng } = await getLatLng(results[0]);

      onChange({ address: publicAddress, lat, lng });
    }
  };

  return isLoaded ? (
    <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
      <input
        placeholder="Въведи адрес..."
        className="w-full py-2 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-0 border-gray-400 focus:border-gray-700 border-2 rounded sm:text-sm/6"
      />
    </Autocomplete>
  ) : (
    <></>
  );
};

export default LocationInput;

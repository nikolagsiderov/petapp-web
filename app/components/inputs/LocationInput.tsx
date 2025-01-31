"use client";

import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGooglePublicAddress as parseGooglePublicAddress } from "pawpal-fe-common/hooks";

export type Location = {
  publicAddress: string;
  privateAddress: string;
  lat: number;
  lng: number;
};

interface LocationInputProps {
  onChange: (value: Location) => void;
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

  const onPlaceChanged = async () => {
    if (searchResult != null) {
      const place = searchResult.getPlace();

      setPrivateAddress(place.formatted_address);
      parseGooglePublicAddress({ googlePlace: place, setPublicAddress });
    } else {
      toast.error("Моля въведете и изберете адрес.");
    }
  };

  useEffect(() => {
    const updateAddressesStateAsync = async () => {
      if (publicAddress !== null && privateAddress !== null) {
        setValue(privateAddress, false);

        const results = await getGeocode({ address: privateAddress });
        const { lat, lng } = await getLatLng(results[0]);

        onChange({ publicAddress, privateAddress, lat, lng });
      }

      clearSuggestions();
    };

    updateAddressesStateAsync();
  }, [privateAddress, publicAddress]);

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

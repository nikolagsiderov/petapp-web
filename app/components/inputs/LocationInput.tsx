"use client";

import {
  useJsApiLoader,
  Autocomplete,
  Libraries,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useGooglePublicAddress as parseGooglePublicAddress } from "@nikolagsiderov/pawpal-fe-common/hooks";
import { useTranslation } from "react-i18next";
import EmptyState from "../EmptyState";

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
  const { t } = useTranslation();

  const [searchResult, setSearchResult] = useState<any>(null);
  const [privateAddress, setPrivateAddress] = useState<any>(null);
  const [publicAddress, setPublicAddress] = useState<string>("");

  const libraries = useMemo<Libraries>(() => ["places"], []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? "",
    libraries,
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
      toast.error(t("Field_is_required"));
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
  }, [privateAddress, publicAddress, clearSuggestions, onChange, setValue]);

  if (process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY) {
    return isLoaded ? (
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
        <input
          placeholder={t("Enter_address")}
          className="w-full py-2 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-0 border-gray-400 focus:border-gray-700 border-2 rounded sm:text-sm/6"
        />
      </Autocomplete>
    ) : (
      <></>
    );
  }

  return (
    <EmptyState
      title="Environment variable 'GOOGLE_PLACES_API_KEY' is missing"
      subtitle="Please provide a valid 'GOOGLE_PLACES_API_KEY' in the environment variables"
    />
  );
};

export default LocationInput;

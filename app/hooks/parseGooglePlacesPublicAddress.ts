import { Dispatch, SetStateAction } from "react";

interface IGooglePlacePublicAddress {
  googlePlace: any;
  setPublicAddress: Dispatch<SetStateAction<string>>;
}

const parseGooglePlacePublicAddress = ({
  googlePlace,
  setPublicAddress,
}: IGooglePlacePublicAddress) => {
  let temp: string = "";
  const components: Array<{
    long_name: string;
    types: Array<string>;
  }> = googlePlace.address_components;

  components.forEach((address) => {
    if (
      !address.types.includes("route") &&
      !address.types.includes("street_address") &&
      !address.types.includes("street_number")
    ) {
      temp += address.long_name + ", ";
    }
  });

  const length = temp.length;
  const result = temp.substring(0, length - 2);

  setPublicAddress(result);
};

export default parseGooglePlacePublicAddress;

import React, { useState } from "react";
import { Icon, Input, Spinner } from "@ui-kitten/components";
import { isValidPostcode } from "../../utils";
import Snackbar from "react-native-snackbar";
import config from "../../../config.json";

interface PostcodeLookupProps {
  updateUserLocation: (coords: coordinates) => any;
}

const CheckMarkIcon = (style: any) => (
  <Icon {...style} name="checkmark-circle-outline" />
);

const SearchIcon = (style: any) => <Icon {...style} name="search-outline" />;

export function PostcodeLookup({ updateUserLocation }: PostcodeLookupProps) {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);

  const getPostcodeGeolocation = async () => {
    if (isValidPostcode(postcode)) {
      console.log("DO POSTCODE");
      const params = new URLSearchParams();
      params.append("address", postcode);
      params.append("key", config.googleApiKey);

      setLoading(true);

      const request = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`
      );
      const location = await request.json();
      setLoading(false);

      if (location.results.length < 1 || !location.results[0].geometry) {
        Snackbar.show({
          text: "Sorry, postcode could not be found",
          duration: Snackbar.LENGTH_SHORT
        });
        return;
      }

      updateUserLocation([
        location.results[0].geometry.location.lat,
        location.results[0].geometry.location.lng
      ]);
    }
  };

  if (loading) return <Spinner />;

  return (
    <Input
      placeholder="Enter your postcode"
      value={postcode}
      onChangeText={setPostcode}
      onBlur={getPostcodeGeolocation}
      accessoryRight={isValidPostcode(postcode) ? CheckMarkIcon : SearchIcon}
    />
  );
}

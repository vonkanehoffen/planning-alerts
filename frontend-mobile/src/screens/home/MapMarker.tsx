import React from "react";
import { Marker } from "react-native-maps";
import { postGisToRNMapsLocation } from "../../utils";
import { PaMarker } from "./PaMarker";

export const MapMarker = ({ pa, status }: any) => (
  <Marker
    coordinate={postGisToRNMapsLocation(pa.location)}
    onPress={() => {
      console.log(`PRESSED ${status} MARKER`);
      // focusPa(pa);
    }}
    tracksViewChanges={false}
    identifier={pa.id}
  >
    <PaMarker status={status} focused={false} />
  </Marker>
);

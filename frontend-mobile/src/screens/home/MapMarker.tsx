import React from "react";
import { Marker } from "react-native-maps";
import { postGisToRNMapsLocation } from "../../utils";
import { PaMarker, PaMarkerStatus } from "./PaMarker";

interface MapMarkerProps {
  setFocusedPaId: (id: string) => any;
  pa: any;
  status: PaMarkerStatus;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  pa,
  status,
  setFocusedPaId
}) => (
  <Marker
    coordinate={postGisToRNMapsLocation(pa.location)}
    onPress={() => {
      console.log(`PRESSED ${status} MARKER`, pa.id);
      setFocusedPaId(pa.id);
    }}
    tracksViewChanges={false}
    identifier={pa.id}
  >
    <PaMarker status={status} focused={false} />
  </Marker>
);

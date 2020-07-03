import React from "react";
import Svg, { G, Path } from "react-native-svg";

export function HomeMarker() {
  return (
    <Svg width={60} height={60} viewBox="0 0 50 50">
      <G>
        <Path
          fill="#093B31"
          d="M24.6,47.9C24,47.2,9,30.4,9,18.7c0-8.8,7.2-16,16-16s16,7.2,16,16c0,11.7-15,28.5-15.7,29.2L25,48.3
		L24.6,47.9z"
        />
        <Path
          fill="#FFFFFF"
          d="M25,3.1c8.6,0,15.5,7,15.5,15.5C40.5,30.3,25,47.5,25,47.5S9.5,30.3,9.5,18.7C9.5,10.1,16.4,3.1,25,3.1
		 M25,2.1c-9.1,0-16.5,7.4-16.5,16.5c0,5,2.7,11.6,7.9,19.4c3.9,5.8,7.8,10.1,7.9,10.2L25,49l0.7-0.8c0.6-0.7,15.8-17.6,15.8-29.5
		C41.5,9.5,34.1,2.1,25,2.1L25,2.1z"
        />
      </G>
      <Path
        fill="#46ab5d"
        d="M23.4,26.2v-4.8h3.2v4.8h4v-6.4H33l-8-7.2l-8,7.2h2.4v6.4H23.4z"
      />
    </Svg>
  );
}

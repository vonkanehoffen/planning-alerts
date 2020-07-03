import React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";

export function LogoFab() {
  return (
    <Svg width={70} height={70} viewBox="0 0 100 100">
      <G
        id="logo-fab"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <Circle id="Oval" fill="#FFFFFF" cx="50" cy="50" r="50" />
        <Path
          d="M59.3585416,20 L59.3585416,33.1256527 L49.999848,20.0320988 L15,69 L85,69 L68.7677127,46.2897012 L68.7677127,26.6787046 L59.3586937,20 L59.3585416,20 Z M49.9997729,33 L70,61 L30,61 L49.9997729,33 Z"
          id="Fill-1"
          fill="#093B31"
        />
      </G>
    </Svg>
  );
}

import React from "react";
import Svg, { G, Path } from "react-native-svg";

export function PaLogo({ color = "#FFFFFF", size = 200 }) {
  return (
    <Svg width={size} height={size * 0.69} viewBox="0 0 398 276">
      <G
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <G
          id="pa-logo"
          transform="translate(-1.000000, -55.000000)"
          fill={color}
        >
          <Path
            d="M253.209994,55 L253.209994,128.932248 L199.999136,55.1808015 L1,331 L399,331 L306.707852,203.080766 L306.707852,92.6188261 L253.210858,55 L253.209994,55 Z M199.998705,130 L314,288 L86,288 L199.998705,130 Z"
            id="Fill-1"
          />
        </G>
      </G>
    </Svg>
  );
}

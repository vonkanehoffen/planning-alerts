import React from "react";
import Svg, { G, Path } from "react-native-svg";

interface PaMarkerProps {
  status: "open" | "closed" | "new";
  focused?: boolean;
}
export function PaMarker({ status, focused }: PaMarkerProps) {
  const bgFill = { open: "#2E6A38", closed: "#999999", new: "#ff9900" };
  const iconFill = { open: "#7BAF5B", closed: "#777777", new: "#ffffff" };

  // TODO: Highlight marker ... can it be done where tracksViewChanges={false} is?
  //     <Svg width={focused ? 51 : 34} height={focused ? 70 : 47} viewBox="0 0 34 47">
  return (
    <Svg width="34px" height="47px" viewBox="0 0 34 47">
      <G
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <G id="homePin" fill-rule="nonzero">
          <G id="marker">
            <Path
              d="M16.6,45.9 C16,45.2 1,28.4 1,16.7 C1,7.9 8.2,0.7 17,0.7 C25.8,0.7 33,7.9 33,16.7 C33,28.4 18,45.2 17.3,45.9 L17,46.3 L16.6,45.9 Z"
              id="Path"
              fill={bgFill[status]}
              stroke="white"
            />
          </G>
          <G
            id="hammer-solid"
            transform="translate(8.000000, 9.000000)"
            fill={iconFill[status]}
          >
            <Path
              d="M18.8511268,6.22086077 L18.1327901,5.49497606 C17.9343984,5.29449973 17.6128451,5.29449973 17.4144534,5.49497606 L17.0554438,5.85775803 L16.1380806,4.93075548 C16.3167918,4.24721137 16.1495079,3.49053351 15.6190879,2.95453999 L14.1827319,1.50309135 C12.1994498,-0.501030448 8.9835996,-0.501030448 7,1.50309135 L9.87302929,2.95453999 L9.87302929,3.55596898 C9.87302929,4.10030232 10.0869749,4.62250307 10.4682044,5.00741762 L12.0280393,6.58364274 C12.5584594,7.11963626 13.307269,7.2886779 13.9837054,7.10808882 L14.9010686,8.03509138 L14.542059,8.39787335 C14.3436673,8.59834968 14.3436673,8.92328172 14.542059,9.12375805 L15.2603957,9.84964275 C15.4587874,10.0501191 15.7803406,10.0501191 15.9787323,9.84964275 L18.8517616,6.94642471 C19.0495185,6.74626914 19.0495185,6.4213371 18.8511268,6.22086077 L18.8511268,6.22086077 Z M9.06939653,6.3807781 C8.95148248,6.26288028 8.85141489,6.13255539 8.75549022,6 L0.625794851,13.5891146 C-0.189086806,14.3500336 -0.211076182,15.6344825 0.5770358,16.4228047 C1.36514778,17.2111269 2.65009218,17.1891406 3.4111158,16.3740524 L11,8.24643147 C10.8738001,8.15370642 10.7482376,8.05938817 10.6354225,7.94658863 L9.06939653,6.3807781 L9.06939653,6.3807781 Z"
              id="Shape"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

import React from "react";
import { View } from "react-native";

interface BoxProps {
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
}

export const Box: React.FC<BoxProps> = ({
  m,
  mx,
  my,
  mt,
  mb,
  mr,
  ml,
  children
}) => {
  const unit = 20;
  let t = 0,
    r = 0,
    b = 0,
    l = 0;
  if (m) {
    t = m;
    r = m;
    b = m;
    l = m;
  }
  if (mx) {
    r = mx;
    l = mx;
  }
  if (my) {
    t = my;
    b = my;
  }
  if (mt) t = mt;
  if (mb) b = mb;
  if (mr) r = mr;
  if (ml) l = ml;

  return (
    <View
      style={{
        marginTop: t * unit,
        marginRight: r * unit,
        marginBottom: b * unit,
        marginLeft: l * unit
      }}
    >
      {children}
    </View>
  );
};

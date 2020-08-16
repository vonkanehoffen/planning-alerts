import React from "react";
import { View, StyleSheet } from "react-native";
import { Spinner } from "@ui-kitten/components";

export const LoadingIndicator = (props: any) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const styles = StyleSheet.create({
  indicator: {
    justifyContent: "center",
    alignItems: "center"
  }
});

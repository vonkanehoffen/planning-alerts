import React from "react";
import { PaLogo } from "./PaLogo";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@ui-kitten/components";

export const PaLogoHeader = () => {
  const theme = useTheme();
  return (
    <View style={styles.logo}>
      <PaLogo color={theme["color-primary-500"]} size={140} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    margin: 20,
    marginTop: 60
  }
});

import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";

export const LayoutFlex: React.FC = ({ children }) => {
  return <Layout style={styles.layout}>{children}</Layout>;
};

const styles = StyleSheet.create({
  layout: {
    flex: 1
  }
});

import React from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";

export const KeyboardAvoidingLayoutFlex: React.FC = ({ children }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <KeyboardAvoidingView behavior="position" style={styles.layout}>
      {children}
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  layout: {
    flex: 1,
    backgroundColor: "color-basic-800"
  }
});

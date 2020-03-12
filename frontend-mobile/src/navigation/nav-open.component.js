import React from "react";
import { Icon, Button } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MenuIcon = style => <Icon {...style} name="menu-outline" />;

export default function NavOpen() {
  const navigation = useNavigation();
  return (
    <Button
      icon={MenuIcon}
      style={styles.container}
      onPress={() => navigation.openDrawer()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: 10
  }
});

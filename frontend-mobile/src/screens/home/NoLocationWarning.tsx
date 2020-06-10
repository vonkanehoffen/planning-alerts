import React from "react";
import { Button, Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { PaLogo } from "../../components/PaLogo";
import { useNavigation } from "@react-navigation/native";

const NavigationIcon = (style: any) => (
  <Icon {...style} name="navigation-2-outline" />
);

// TODO: Shouldn't need this if redirect works?
export default function NoLocationWarning() {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <Layout style={styles.container}>
      <PaLogo color={theme["color-primary-300"]} size={140} />
      <Text category="h3" style={styles.heading}>
        No location set!
      </Text>
      <Text style={styles.subheading}>
        Planning alerts needs to know what area you want to see planning
        applications in.
      </Text>
      <Button
        onPress={() => navigation.navigate("Set Location")}
        accessoryRight={NavigationIcon}
      >
        Set Location
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60
  },
  heading: {
    paddingTop: 30
  },
  subheading: {
    paddingTop: 30,
    paddingBottom: 30
  }
});

import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { PaLogo } from "../../components/pa-logo.component";

const PeopleIcon = style => <Icon {...style} name="people-outline" />;

export function WelcomeScreen({ doLogin }) {
  return (
    <ImageBackground
      source={require("../../../assets/intro-bg.jpg")}
      style={styles.container}
    >
      <View>
        <PaLogo/>
        <Text category="h1" style={styles.text}>Welcome to Planning Alerts</Text>
        <Text category="h2" style={styles.text}>It’s time you knew what’s happening in your neighbourhood.</Text>
      </View>
      <Button icon={PeopleIcon} onPress={doLogin} style={styles.button} size="giant">
        Sign up / Login
      </Button>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 30
  },
  button: {
    width: '100%'
  },
  text: {
    color: 'white',
    paddingTop: 30
  }
});

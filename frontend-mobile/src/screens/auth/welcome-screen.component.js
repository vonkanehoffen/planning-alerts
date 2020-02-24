import React from 'react'
import { StyleSheet } from "react-native";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";

const HeartIcon = style => <Icon {...style} name="heart" />;

export function WelcomeScreen ({ doLogin }) {
  return (
    <Layout style={styles.container}>
      <Text>Welcome stuff here</Text>
      <Button icon={HeartIcon} onPress={doLogin}>
        Log In
      </Button>
    </Layout>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    textAlign: "center"
  }
});

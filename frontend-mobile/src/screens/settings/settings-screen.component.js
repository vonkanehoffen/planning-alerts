import React from "react";
import { Alert } from "react-native";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { AuthContext } from "../auth/auth-provider.component";
import { auth0 } from "../auth/auth-provider.component";

export function SettingsScreen() {
  const { setAuth } = React.useContext(AuthContext);

  const _onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert("Logged out!");
        setAuth(null);
      })
      .catch(error => {
        console.log("Log out cancelled");
      });
  };

  return (
    <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Button onPress={_onLogout}>Log Out</Button>
    </Layout>
  );
}

import React from "react";
import { Alert } from "react-native";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { AuthContext } from "../auth/auth-provider.component";
import { auth0 } from "../auth/auth-provider.component";
import * as Keychain from "react-native-keychain"

export function SettingsScreen({ navigation }) {
  const { setAuth } = React.useContext(AuthContext);

  const _onLogout = () => {
    Keychain.resetGenericPassword();
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
      <Button onPress={() => navigation.navigate("Set Location")}>
        Set Location
      </Button>
    </Layout>
  );
}

import React from "react";
import { Alert } from "react-native";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { AuthContext } from "../auth/auth-provider.component";
import { auth0 } from "../auth/auth-provider.component";
import * as Keychain from "react-native-keychain"

export function SettingsScreen({ navigation }) {
  const { doLogout } = React.useContext(AuthContext);

  return (
    <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Button onPress={doLogout}>Log Out</Button>
      <Button onPress={() => navigation.navigate("Set Location")}>
        Set Location
      </Button>
    </Layout>
  );
}

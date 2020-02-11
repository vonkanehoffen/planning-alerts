import React from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import * as Keychain from "react-native-keychain";
import { auth0 } from "./auth-provider.component";

const HeartIcon = style => <Icon {...style} name="heart" />;

export function AuthScreen({ navigation, setAuth }) {
  const _onLogin = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: "openid profile email offline_access"
      });

      // Successfully authenticated
      // Store the idToken
      console.log("creds -", credentials);
      const userInfo = await auth0.auth.userInfo({
        token: credentials.accessToken
      });
      console.log("USER INFO:", userInfo);
      await Keychain.setGenericPassword(
        "refreshToken",
        credentials.refreshToken
      );
      setAuth({ credentials, userInfo });
    } catch (error) {
      // TODO: Error toasts
      console.log("Auth error: ", error);
    }
  };

  return (
    <Layout style={styles.container}>
      <Button icon={HeartIcon} onPress={_onLogin}>
        Log In
      </Button>
    </Layout>
  );
}

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

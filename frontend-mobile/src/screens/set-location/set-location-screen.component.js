import React, { useContext } from "react";
import { View } from "react-native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { AuthContext } from "../auth/auth-provider.component";
import { useMutation } from "@apollo/react-hooks";
import * as queries from "../../data-layer/graphql-queries";
import { StyleSheet } from "react-native";
import { PostcodeLookup } from "./postcode-lookup.component";
import { GetDeviceLocation } from "./get-device-location.component";
import Snackbar from "react-native-snackbar";
import { PaLogo } from "../../components/pa-logo.component";

export function SetLocationScreen({ navigation }) {
  const theme = useTheme();
  const { credentials } = useContext(AuthContext);
  const [updateUserLocationMutation, { loading, error, data }] = useMutation(
    queries.UPDATE_USER_LOCATION
  );

  const updateUserLocation = async coordinates => {
    await updateUserLocationMutation({
      variables: {
        id: credentials.claims.sub,
        location: {
          type: "Point",
          coordinates
        }
      }
    });
    console.log("done update loc", coordinates);
    navigation.navigate("Home");
  };

  if (error) {
    Snackbar.show({
      text: "Sorry, postcode could not be found",
      duration: Snackbar.LENGTH_SHORT
    });
  }

  return (
    <Layout style={styles.container}>
      <View>
        <PaLogo color={theme["color-primary-300"]} size={140} />
        <Text category="h3" style={styles.intro}>
          Where do you live?
        </Text>
        <Text>
          We'll show you planning applications that have been made near you.
        </Text>
      </View>
      <View>
        <PostcodeLookup updateUserLocation={updateUserLocation} />
        <Text category="h4" style={styles.or}>
          or
        </Text>
        <GetDeviceLocation updateUserLocation={updateUserLocation} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20
  },
  intro: {
    paddingTop: 20,
    paddingBottom: 20
  },
  or: {
    paddingTop: 20,
    paddingBottom: 20
  }
});

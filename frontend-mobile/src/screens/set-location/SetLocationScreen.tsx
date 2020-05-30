import React, { useContext } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { AuthContext } from "../auth/AuthProvider";
import { StyleSheet } from "react-native";
import { PostcodeLookup } from "./PostcodeLookup";
import { GetDeviceLocation } from "./GetDeviceLocation";
import Snackbar from "react-native-snackbar";
import { PaLogo } from "../../components/PaLogo";
import {
  Get_User_LocationDocument,
  useUpdate_User_LocationMutation
} from "../../generated/graphql";

export function SetLocationScreen({ navigation }: any) { // TODO: UseNavigation?
  const theme = useTheme();
  const { credentials } = useContext(AuthContext);
  const [
    updateUserLocationMutation,
    { loading, error, data }
  ] = useUpdate_User_LocationMutation({
    update(
      cache,
      mutationResponse
    ) {
      cache.writeQuery({
        query: Get_User_LocationDocument,
        variables: {
          id: credentials.claims.sub
        },
        data: { users: mutationResponse.data?.update_users?.returning }
      });
    }
  });

  const updateUserLocation = async (coordinates: coordinates) => {
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
      <KeyboardAvoidingView behavior="padding">
        <PostcodeLookup updateUserLocation={updateUserLocation} />
        <Text category="h4" style={styles.or}>
          or
        </Text>
        <GetDeviceLocation updateUserLocation={updateUserLocation} />
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 60
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

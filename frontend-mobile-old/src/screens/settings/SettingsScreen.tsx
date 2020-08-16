import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Layout, ListItem, Text } from "@ui-kitten/components";
import { AuthContext } from "../auth/AuthProvider";
import { useGet_User_MetaQuery } from "../../generated/graphql";
import { PaLogoHeader } from "../../components/PaLogoHeader";

const PersonIcon = (style: any) => <Icon {...style} name="person-outline" />;
const LogoutIcon = (style: any) => <Icon {...style} name="log-out-outline" />;
const NavigationIcon = (style: any) => (
  <Icon {...style} name="navigation-2-outline" />
);

export function SettingsScreen({ navigation }: any) {
  const {
    doLogout,
    credentials: { claims }
  } = React.useContext(AuthContext);
  const { data } = useGet_User_MetaQuery({
    variables: {
      id: claims.sub
    }
  });
  const userLocation = JSON.stringify(data?.users_by_pk?.location?.coordinates);
  const userCouncil = data?.users_by_pk?.council?.title;

  console.log("USER LOC", userLocation);

  return (
    <Layout style={styles.container}>
      <PaLogoHeader />
      <Text category="h1" style={styles.header}>
        Settings
      </Text>
      <ListItem
        title={`Logged in as ${claims.name}`}
        description={claims.sub}
        accessoryLeft={PersonIcon}
      />
      <ListItem
        title="Set Council"
        description={userCouncil}
        onPress={() => navigation.navigate("Council")}
        accessoryLeft={NavigationIcon}
      />
      <ListItem
        title="Set Location"
        description={userLocation}
        onPress={() => navigation.navigate("Set Location")}
        accessoryLeft={NavigationIcon}
      />
      <ListItem title="Log out" accessoryLeft={LogoutIcon} onPress={doLogout} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    margin: 20,
    marginTop: 60
  },
  header: {
    margin: 20
  }
});

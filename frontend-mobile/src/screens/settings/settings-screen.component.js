import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Layout, ListItem, Text, useTheme } from "@ui-kitten/components";
import { AuthContext } from "../auth/auth-provider.component";
import { PaLogo } from "../../components/pa-logo.component";

const PersonIcon = style => <Icon {...style} name="person-outline" />;
const LogoutIcon = style => <Icon {...style} name="log-out-outline" />;
const NavigationIcon = style => <Icon {...style} name="navigation-2-outline" />;

export function SettingsScreen({ navigation }) {
  const theme = useTheme();
  const {
    doLogout,
    credentials: { claims }
  } = React.useContext(AuthContext);

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <PaLogo color={theme["color-primary-300"]} size={140} />
      </View>
      <Text category="h1" style={styles.header}>
        Settings
      </Text>
      <ListItem
        title={`Logged in as ${claims.name}`}
        description={claims.sub}
        icon={PersonIcon}
      />
      <ListItem
        title="Set Location"
        onPress={() => navigation.navigate("Set Location")}
        icon={NavigationIcon}
      />
      <ListItem title="Log out" icon={LogoutIcon} onPress={doLogout} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    margin: 20
  }
});

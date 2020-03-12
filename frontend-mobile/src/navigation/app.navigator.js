import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer as UIKittenDrawer, Layout, Text } from "@ui-kitten/components";
import { HomeScreen } from "../screens/home/home-screen.component";
import { SettingsScreen } from "../screens/settings/settings-screen.component";
import { SetLocationScreen } from "../screens/set-location/set-location-screen.component";
import { NavSpinnerIcon } from "./nav-spinner-icon.component";

const Drawer = createDrawerNavigator();

function DrawerContent({ navigation, state }) {
  const onSelect = index => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <UIKittenDrawer
      data={[
        { title: "Home" },
        { title: "Settings" },
        { title: "Set Location" }
      ]}
      selectedIndex={state.index}
      onSelect={onSelect}
    />
  );
}

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => <NavSpinnerIcon />
        }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Set Location" component={SetLocationScreen} />
    </Drawer.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

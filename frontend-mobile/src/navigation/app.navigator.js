import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { HomeScreen } from "../screens/home/home-screen.component";
import { SettingsScreen } from "../screens/settings/settings-screen.component";
import { SetLocationScreen } from "../screens/set-location/set-location-screen.component";

// Don't delete these... it f***** jinxes it.
// import {MapTest} from '../screens/test/map-test.component';
import MapViewRefs from "../screens/test/MapViewRefs";

const BottomTab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  const onSelect = index => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab title="HOME" />
        <BottomNavigationTab title="SETTINGS" />
        <BottomNavigationTab title="SET LOCATION" />
        <BottomNavigationTab title="TEST" />
      </BottomNavigation>
    </SafeAreaView>
  );
};

const TabNavigator = () => (
  <BottomTab.Navigator
    tabBar={props => <BottomTabBar {...props} />}
    initialRouteName="Home"
  >
    <BottomTab.Screen name="Home" component={HomeScreen} />
    <BottomTab.Screen name="Settings" component={SettingsScreen} />
    <BottomTab.Screen name="Set Location" component={SetLocationScreen} />
    <BottomTab.Screen name="Test" component={MapViewRefs} />
  </BottomTab.Navigator>
);

export function AppNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

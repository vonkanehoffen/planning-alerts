import React from "react";
import { SafeAreaView } from "react-native";
import {
  NavigationContainer,
  TabNavigationState
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { HomeScreen } from "../screens/home/HomeScreen";
import { SettingsScreen } from "../screens/settings/SettingsScreen";
import { SetLocationScreen } from "../screens/set-location/SetLocationScreen";
import { SetCouncilScreen } from '../screens/set-council/SetCouncilScreen'

// Don't delete these... it f***** jinxes it.
// import {MapTest} from '../screens/test/map-test.component';
// import MapViewRefs from "../screens/test/MapViewRefs";

const BottomTab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }: any) => {
  const onSelect = (index: number) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab title="HOME" />
        <BottomNavigationTab title="SETTINGS" />
        <BottomNavigationTab title="SET LOCATION" />
        <BottomNavigationTab title="Set Council" />
        {/*<BottomNavigationTab title="TEST" />*/}
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
    <BottomTab.Screen name="Set Council" component={SetCouncilScreen} />
    {/*<BottomTab.Screen name="Test" component={MapViewRefs} />*/}
  </BottomTab.Navigator>
);

export function AppNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

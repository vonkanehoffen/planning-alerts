import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/home-screen.component";
import { SettingsScreen } from "../screens/settings/settings-screen.component";
import { SetLocationScreen } from "../screens/set-location/set-location-screen.component";
import { NavSpinnerIcon } from './nav-spinner-icon.component'

const Stack = createStackNavigator();

export function AppNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => <NavSpinnerIcon/>
          }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Set Location" component={SetLocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


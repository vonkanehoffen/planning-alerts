import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/home-screen.component";
import { SettingsScreen } from "../screens/settings/settings-screen.component";
import { Icon } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => <SettingsButton />
          }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SettingsButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <Icon name="settings-outline" width={32} height={32} fill="#3366FF" />
    </TouchableOpacity>
  );
}

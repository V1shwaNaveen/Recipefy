import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/homescreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Recipefy">
        <Stack.Screen name="Recipefy" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

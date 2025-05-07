import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./screens/homescreen";
import ExploreScreen from "./screens/explorescreen";
import AddRecipeScreen from "./screens/addRecipeScreen";
import ShoppingListScreen from "./screens/shoppingListScreen";
import AccountScreen from "./screens/accountScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home")
              iconName = focused ? "home" : "home-outline";
            else if (route.name === "Explore")
              iconName = focused ? "search" : "search-outline";
            else if (route.name === "Add")
              iconName = focused ? "add-circle" : "add-circle-outline";
            else if (route.name === "List")
              iconName = focused ? "list" : "list-outline";
            else if (route.name === "Account")
              iconName = focused ? "person" : "person-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: "#fff",
            elevation: 10,
          },
          tabBarActiveTintColor: "#1e90ff",
          tabBarInactiveTintColor: "#aaa",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen
          name="Add"
          component={AddRecipeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="add-circle"
                size={focused ? 60 : 50}
                color="#1e90ff"
                style={{
                  marginBottom: 20,
                }}
              />
            ),
          }}
        />
        <Tab.Screen name="List" component={ShoppingListScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

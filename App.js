import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ProfileScreen from "./app/screens/ProfileScreen";
import BlogScreen from "./app/screens/BlogScreen";
import HomeScreen from "./app/screens/HomeScreen";
import ScreenDBCheck from "./app/screens/ScreenDBCheck";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Blogs" component={ScreenDBCheck} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    fontFamily: "MountainsofChristmas-Bold",
    fontSize: 40,
    alignSelf: "flex-start",
  },
});

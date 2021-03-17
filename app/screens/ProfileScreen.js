import React from "react";
import {
  SafeAreaView,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./LoginUI";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function ProfileView({ props, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        icon="login"
        mode="contained"
        onPress={() => navigation.navigate("Login")}
      >
        Login
      </Button>
    </SafeAreaView>
  );
}

function MainStackScreen(props) {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Profile" component={ProfileView} />
    </MainStack.Navigator>
  );
}

function ProfileScreen() {
  return (
    <NavigationContainer independent={true}>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Login" component={Login} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default ProfileScreen;

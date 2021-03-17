import React from "react";
import {
  SafeAreaView,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";

function BlogScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello</Text>
    </SafeAreaView>
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

export default BlogScreen;

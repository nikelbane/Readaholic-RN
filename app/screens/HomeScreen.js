import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  StatusBar,
  FlatList,
  Dimensions,
  View,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { SearchBar, Image, Rating } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BookSelectScreen from "./BookSelectScreen";
import { Avatar, Button, Card } from "react-native-paper";
import NumberFormat from "react-number-format";
import CartScreen from "./CartScreen";

const Stack = createStackNavigator();

const fetchfonts = () => {
  return Font.loadAsync({
    "MountainsofChristmas-Bold": require("../assets/fonts/MountainsofChristmas-Bold.ttf"),
    "MountainsofChristmas-Regular": require("../assets/fonts/MountainsofChristmas-Regular.ttf"),
  });
};

/* const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Ikigai: The Japanese secret to a long and happy life",
    author: "Francesc Miralles and Hector Garcia",
    image: require("../assets/product_images/ikigai.jpg"),
    price: 19,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image: require("../assets/product_images/sapiens.jpg"),
    price: 29,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    image: require("../assets/product_images/tagr.jpg"),
    price: 25,
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bc",
    title: "The India Way",
    author: "S. Jaishankar",
    image: require("../assets/product_images/theindiaway.jpg"),
    price: 30,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97w63",
    title: "Da Vinci Code",
    author: "Dan Brown",
    image: require("../assets/product_images/daVinci.jpg"),
    price: 39,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145971e29d72",
    title: "Wings of Fire",
    author: "APJ Abdul Kalam",
    image: require("../assets/product_images/wings.jpg"),
    price: 19,
  },
]; */

function getDBCheck(props) {
  const [books, setBooks] = useState(false);
  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    fetch("http://192.168.1.9:3000/book")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setBooks(JSON.parse(data));
      });
  }
  return books;
}

function HomeView({ navigation, props }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { devheight, devwidth } = Dimensions.get("screen");

  const DATA = getDBCheck(props);

  console.log(DATA);

  // font loaded async
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchfonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }

  //list render
  const renderItem = ({ item }) => {
    return (
      <View
        style={{ flex: 1, flexDirection: "row", padding: 0, borderWidth: 0.25 }}
      >
        <Image
          source={item.image}
          style={{
            width: 150,
            height: 200,
            resizeMode: "contain",
            padding: 0,
          }}
          onPress={() =>
            navigation.navigate("Details", {
              itemId: item.id,
              title: item.title,
            })
          }
        />
        <View style={{ flex: 3 }}>
          <Card style={{ padding: 0 }}>
            <Card.Title title={item.title} subtitle={item.author} />
            <Card.Content>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={20}
                readonly
                startingValue={3}
                style={{ padding: 10 }}
              />
              <ReactNativeNumberFormat value={item.price} />
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.navigate("Details", {
                    itemId: item.id,
                    title: item.title,
                  })
                }
              >
                View Details
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </View>
    );
  };

  // main view
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}> Readaholic </Text>
        <View style={{ paddingLeft: 50 }}>
          <Button
            icon="cart"
            mode="contained"
            onPress={() => navigation.navigate("My Cart")}
            contentStyle={{ flexDirection: "row-reverse" }}
          >
            Cart
          </Button>
        </View>
      </View>

      <SearchBar
        round
        searchIcon={{ size: 24 }}
        placeholder="Search books"
        lightTheme
        inputStyle={{ backgroundColor: "white", paddingLeft: 10 }}
        containerStyle={{
          backgroundColor: "white",
          borderRadius: 5,
          borderBottomWidth: 0,
          borderTopWidth: 0,
          paddingBottom: 10,
        }}
      />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

function HomeScreen(props) {
  return (
    <NavigationContainer styles={styles.container} independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{
            headerLeft: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="Info"
                color="#aaa"
              />
            ),
          }}
        />
        <Stack.Screen name="Details" component={BookSelectScreen} />
        <Stack.Screen name="My Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ReactNativeNumberFormat({ value }) {
  return (
    <NumberFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      prefix={" $"}
      renderText={(formattedValue) => (
        <Text style={{ fontSize: 30, padding: 5 }}>{formattedValue}</Text>
      )}
    />
  );
}

//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontFamily: "MountainsofChristmas-Bold",
    fontSize: 40,
    alignSelf: "flex-start",
  },
});

export default HomeScreen;

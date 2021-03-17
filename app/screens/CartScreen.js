import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  StatusBar,
  Text,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Image } from "react-native-elements";
import NumberFormat from "react-number-format";
import { createStackNavigator } from "@react-navigation/stack";

function getDBCheck(props) {
  const [cart, setCart] = useState(false);
  useEffect(() => {
    getCart();
  }, []);

  function getCart() {
    fetch("http://192.168.1.9:3000/cart")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setCart(JSON.parse(data));
      });
  }
  return cart;
}

function ReactNativeNumberFormat({ value }) {
  return (
    <NumberFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"Quantity: "}
      renderText={(formattedValue) => (
        <Text style={{ fontSize: 30, padding: 5 }}>{formattedValue}</Text>
      )}
    />
  );
}

function CartScreen(props) {
  const [selectedId, setSelectedId] = useState(null);
  const DATA = getDBCheck(props);

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
        />
        <View style={{ flex: 3 }}>
          <Card style={{ padding: 0 }}>
            <Card.Title title={item.book} />
            <Card.Content>
              <ReactNativeNumberFormat value={item.count} />
            </Card.Content>
            <Card.Actions>
              <Button>View Details</Button>
            </Card.Actions>
          </Card>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
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
export default CartScreen;

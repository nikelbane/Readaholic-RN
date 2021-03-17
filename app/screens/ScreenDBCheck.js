import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { View } from "react-native";

function ScreenDBCheck(props) {
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
        console.log(typeof data);
        const x = JSON.parse(data);
        console.log(x[1].title);
        setBooks(data);
      });
  }
  return (
    <View>
      <Text> {books ? books : "There is no books available"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
export default ScreenDBCheck;

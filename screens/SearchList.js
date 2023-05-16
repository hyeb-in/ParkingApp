import { View, TextInput, Text, FlatList } from "react-native";
import database, { firebase } from "@react-native-firebase/database";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchList = (text) => {
  const database = firebase.database().ref("records");
  let result = [];

  database.on("value", (snapshot) => {
    const data = snapshot.val();

    const indexData = Object.keys(data).map((key) => ({
      id: key,
      roadadr: data[key].roadadr,
      numadr: data[key].numadr,
    }));

    const query = text;

    const options = {
      keys: ["roadadr", "numadr"],
      threshold: 0.9,
      minMatchCharLength: query.length,
    };

    const fuse = new Fuse(indexData, options);
    const results = fuse.search(query);
    console.log(query.length);
    console.log(results);
    result = results;
  });

  // Define the renderItem function to render each item
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={result}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default SearchList;

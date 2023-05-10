import styled from "styled-components/native";
import { View, TextInput, Text } from "react-native";
import database, { firebase } from "@react-native-firebase/database";
import { useEffect, useState } from "react";
import { REACT_APP_OPEN_API_KEY } from "@env";
import Fuse from "fuse.js";

const Search = () => {
  const [text, setText] = useState("");

  const getParkingLotData = async () => {
    const database = firebase.database().ref("records");

    database.on("value", (snapshot) => {
      const data = snapshot.val();

      const indexData = Object.keys(data).map((key) => ({
        id: key,
        address: data[key].address,
      }));
      const query = text;

      const options = {
        keys: ["address"],
        threshold: 1,
        minMatchCharLength: query.length,
      };

      const fuse = new Fuse(indexData, options);
      const results = fuse.search(query);
      console.log(query.length);
      console.log(results);
    });
  };

  useEffect(() => {
    getParkingLotData();
  }, []);

  const onChangeText = (content) => {
    console.log(content);
    setText(content);
  };

  const submitText = () => {
    setText("");
    getParkingLotData();
  };
  return (
    <View style={{ position: "absolute", top: 10, width: "100%" }}>
      <TextInput
        style={{
          borderRadius: 10,
          marginTop: 30,
          marginLeft: 10,
          marginRight: 10,
          color: "#000",
          borderColor: "#666",
          backgroundColor: "#FFF",
          borderWidth: 1,
          height: 45,
          paddingHorizontal: 10,
          fontSize: 18,
        }}
        placeholder={"Search"}
        placeholderTextColor={"#666"}
        onChangeText={onChangeText}
        value={text}
        onSubmitEditing={submitText}
      />
    </View>
  );
};

export default Search;

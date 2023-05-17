import { View, TextInput, Text } from "react-native";
import database, { firebase } from "@react-native-firebase/database";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import SearchList from "../screens/SearchList";

const Search = (props) => {
  const { navigation } = props;
  const [text, setText] = useState("");

  const getParkingLotData = () => {
    SearchList(text);
    navigation.navigate("Stack", { screen: "SearchList" });
  };

  // useEffect(() => {
  //   getParkingLotData();
  // }, []);

  const onChangeText = (content) => {
    console.log(content);
    setText(content);
  };

  const submitText = () => {
    setText("");
    navigation.navigate("Stack", {
      screen: "SearchList",
      params: { searchText: text },
    });
  };
  return (
    // <View style={{ position: "absolute", top: 10, width: "100%" }}>
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
    //    </View>
  );
};

export default Search;

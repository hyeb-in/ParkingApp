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
    // const database =  firebase.database().ref("records");

    // database.on("value", (snapshot) => {
    //   const data = snapshot.val();

    //   const indexData = Object.keys(data).map((key) => ({
    //     id: key,
    //     roadadr: data[key].roadadr,
    //     numadr: data[key].numadr,
    //   }));

    //   const query = text;

    //   const options = {
    //     keys: ["roadadr", "numadr"],
    //     threshold: 0.9,
    //     minMatchCharLength: query.length,
    //   };

    //   const fuse = new Fuse(indexData, options);
    //   const results = fuse.search(query);
    //   console.log(query.length);
    //   console.log(results);
    // });
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
    // <View style={{ position: "absolute", top: 10, width: "100%" }}>
    <TextInput
      style={{
        borderRadius: 10,
        marginTop: 10,
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
      onSubmitEditing={getParkingLotData}
    />
    //    </View>
  );
};

export default Search;

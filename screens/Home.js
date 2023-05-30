import { View, Text, TextInput, TouchableOpacity } from "react-native";

import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Map from "../components/Map";
import Search from "../components/Search";

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Map에 Properties로 latitud,longtitude 넘겨야할 것 같음. 그래야지 loading 일괄적으로 가능능 */}
      {/* search.js는 그냥 Home.js에 구현해야할 것 같음.  */}
      <Map />
      {/* <View style={{ position: "absolute", top: 10, width: "100%" }}> */}
      <Search navigation={navigation} />
      {/* <TextInput
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
          // onChangeText={onChangeText}
          // value={text}
          onSubmitEditing={() =>
            navigation.navigate("Stack", { screen: "SerachList" })
          }
        /> */}
      {/* </View> */}
      <StatusBar />
    </View>
  );
};

export default Home;

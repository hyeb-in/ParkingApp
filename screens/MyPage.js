import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

const MyPage = () => {
  const navigation = useNavigation();

  const logOut = () => {
    auth().signOut();
  };
  
  const FavoriteList = () => {
    navigation.navigate("Stack", {
      screen: "FavoriteList",
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={FavoriteList}>
        <Text>즐겨찾는 주차장</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logOut}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyPage;


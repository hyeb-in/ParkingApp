import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
      <TouchableOpacity style={styles.button} onPress={FavoriteList}>
        <View style={{ marginTop: 20, marginHorizontal: 10, marginBottom:10,}}>
        <Text style={{ fontSize: 20}}>즐겨찾는 주차장</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={logOut}>
       <View style={{marginHorizontal: 10, marginBottom:10}}>
        <Text style={{ fontSize: 20}}>로그아웃</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    // alignItems: 'center',
    // backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 2,
    borderColor: "black",
    borderStyle: "solid",
    fontSize: 20,

  },
});

export default MyPage;
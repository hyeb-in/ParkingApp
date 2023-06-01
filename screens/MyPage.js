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

      <TouchableOpacity style={styles.button2} onPress={logOut}>	
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 2,
    borderColor: "black",
    borderStyle: "solid",
    fontSize: 20,
  },
  button2: {
    alignItems: 'flex-end',
    paddingTop: 600,
    paddingRight: 15,
    fontSize: 20,
  },

});

export default MyPage;
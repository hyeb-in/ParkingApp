import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";

const MyPage = () => {
  const logOut = () => {
    auth().signOut();
  };
  return (
    <TouchableOpacity onPress={logOut}>
      <Text>로그아웃</Text>
    </TouchableOpacity>
  );
};

export default MyPage;

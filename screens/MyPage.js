import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import auth from "@react-native-firebase/auth";

const MyPage = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  const logOut = () => {
    auth().signOut();
  };

  const FavoriteList = () => {
    navigation.navigate("Stack", {
      screen: "FavoriteList",
    });
  };

  const pressHandler = (uid) => {
    navigation.navigate("Stack", {
      screen: "MyPageReview",
      params: uid,
    });
  };

  const getUserInfo = () => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const userEmail = user.email;
        setUid(uid);
        setEmail(userEmail);
        console.log(user);
        console.log("uid", uid);
      } else {
        console.log("user is not signed in");
      }
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={FavoriteList}>
        <Text>즐겨찾는 주차장</Text>
      </TouchableOpacity>
      <Text>사용자 이메일 {email}</Text>
      <TouchableOpacity onPress={() => pressHandler(uid)}>
        <Text>내가 쓴 리뷰</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logOut}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyPage;

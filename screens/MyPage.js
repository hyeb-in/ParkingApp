import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
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
      <TouchableOpacity style={styles.button} onPress={FavoriteList}>
        <View style={{ marginTop: 20, marginHorizontal: 10, marginBottom: 10 }}>
          <Text style={{ fontSize: 20 }}>
            <Image
              source={require("../assets/car.png")}
              style={{ width: 30, height: 30 }}
            />{" "}
            즐겨찾는 주차장{" "}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => pressHandler(uid)}>
        <View style={{ marginTop: 20, marginHorizontal: 10, marginBottom: 10 }}>
          <Text style={{ fontSize: 20 }}>
            <Image
              source={require("../assets/reviewPic.png")}
              style={{ width: 30, height: 30 }}
            />{" "}
            내가 쓴 리뷰
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{ marginTop: 500 }}> </Text>
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
    alignItems: "flex-end",
    paddingTop: 10,
    paddingRight: 20,
    fontSize: 20,
  },
});

export default MyPage;

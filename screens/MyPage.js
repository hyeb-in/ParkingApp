import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import auth from "@react-native-firebase/auth";
import { reviewRef } from "../firebase/realtimedb";

const MyPage = () => {
  const [email, setEmail] = useState(null);
  const [uid, setUid] = useState(null);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    getUserInfo();
    getMyReview();
  }, []);

  const logOut = () => {
    auth().signOut();
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

  const getMyReview = async () => {
    try {
      const snapshot = await reviewRef.qualTo(uid).once("value");

      const data = snapshot.val();

      console.log(`데이터야 ${data}`);
      const myReviews = data
        ? Object.keys(data).map((key) => ({
            id: key,
            // uid: data[key].uid,
            text: data[key].text,
          }))
        : [];

      setMyReviews(myReviews);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={{ fontSize: 20 }}>{item.text}</Text>
      </View>
    );
  };
  return (
    <View>
      <Text>사용자 이메일 {email}</Text>
      <Text>내가 쓴 리뷰</Text>
      <FlatList
        data={myReviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity onPress={logOut}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyPage;

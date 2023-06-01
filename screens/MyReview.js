import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { reviewRef } from "../firebase/realtimedb";

const MyPageReview = ({ route }) => {
  const [myReviews, setMyReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const uid = route.params;

  useEffect(() => {
    getMyReview();
  }, []);

  const getMyReview = async () => {
    try {
      const snapshot = await reviewRef.once("value");
      console.log("스냅샵밸", snapshot.val());
      const data = snapshot.val();

      const myReviews = data
        ? Object.keys(data).map((key) => ({
            id: key,
            text: data[key].text,
          }))
        : [];

      setMyReviews(myReviews);
      setIsLoading(false);
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
  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 30 }} />;
  }
  return (
    <FlatList
      data={myReviews}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyPageReview;

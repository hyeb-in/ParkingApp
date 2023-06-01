import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { reviewRef } from "../firebase/realtimedb";

//리뷰 저장 로직이랑 렌더링 로직 분리

const RenderReview = (props) => {
  const [review, setReview] = useState([]);
  const { parkingLotId } = props;
  useEffect(() => {
    getReview();
  }, []);

  //database 루트 url

  const getReview = async () => {
    try {
      reviewRef
        .orderByChild("parkingLotId")
        .equalTo(parkingLotId)
        .on("value", (snapshot) => {
          const data = snapshot.val();

          const reviews = data
            ? Object.keys(data).map((key) => ({
                id: key,
                //parkingLotId: data[key].parkingLotId,
                text: data[key].text,
              }))
            : [];

          setReview(reviews);
        });
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
    <FlatList
      data={review}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RenderReview;

import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";
import { databaseRef } from "../firebase/realtimedb";
import auth from "@react-native-firebase/auth";

const CheckFavorite = ({ onPress, style, children, parkingLotId }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  //const parkingLotId = 7250; //나중에 변수로 바꾸기
  //route.params;

  useEffect(() => {
    getParkingLotData();
    checkFavoriteStatus();
  }, []);

  //realtime database, /records url에서 가져오기
  const getParkingLotData = async () => {
    try {
      const snapshot = await databaseRef
        .child(`/${parkingLotId}`)
        .once("value");
      const data = snapshot.val();
      setResult(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        const favoritesSnapshot = await databaseRef
          .child(`users/${user.uid}/favorites`)
          .once("value");
        const favorites = favoritesSnapshot.val();
        setIsFavorite(favorites && favorites[parkingLotId] ? true : false);
      } catch (error) {
        console.log("Error checking favorite status:", error);
      }
    }
  };

  const toggleFavorite = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        const favoritesRef = databaseRef.child(`users/${user.uid}/favorites`);
        const favoriteStatus = !isFavorite;
        await favoritesRef.child(parkingLotId.toString()).set(favoriteStatus);
        setIsFavorite(favoriteStatus);
        console.log("parkingLotId", parkingLotId, "isFavorite:", isFavorite);
      } catch (error) {
        console.log("Error toggling favorite:", error);
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleFavorite}
      style={[
        styles.button,
        isFavorite ? styles.buttonFavorite : styles.buttonNotFavorite,
      ]}
    >
      {/* 즐겨찾기 이모지 하트로 변경 */}
      <Text style={styles.buttonText}>{isFavorite ? "🤍" : "❤"}</Text> 

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 32,
    paddingBottom: 2,
    borderRadius: 20,
    marginLeft:5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonFavorite: {
    //backgroundColor: "lightgray",
    //color: "red",
  },
  buttonNotFavorite: {
    //backgroundColor: "lightblue",
    //color: "black",
  },
  buttonText: {
    color: "black",
    fontSize: 22,
    marginBottom: 1,
  },
});
export default CheckFavorite;
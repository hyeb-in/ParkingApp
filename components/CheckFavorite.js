import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

const CheckFavorite = ({ parkingLotId, prkplceNm }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const parkingId = parseInt(parkingLotId);
  const user = auth().currentUser;
  useEffect(() => {
    // checkFavoriteStatus();
    getFavoriteStatus();
  }, []);

  const getFavoriteStatus = async () => {
    if (user) {
      try {
        const favoritesRef = database().ref(`users/${user.uid}/favorites`);
        const snapshot = await favoritesRef
          .orderByChild("parkingLotId")
          .equalTo(parkingId)
          .once("value");

        const data = snapshot.val();
        console.log(data);

        const myStatus = data
          ? Object.keys(data).map((key) => ({
              id: key,
              favoriteStatus: data[key].favoriteStatus,
            }))
          : [];
        setIsFavorite(myStatus && myStatus[0].favoriteStatus ? true : false);
        console.log("status", myStatus[0].favoriteStatus);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleFavorite = () => {
    if (user) {
      try {
        const favoritesRef = database().ref(`users/${user.uid}/favorites`);
        const favoriteStatus = !isFavorite;

        favoritesRef.push({
          parkingLotId: parkingId,
          favoriteStatus,
          prkplceNm,
        });

        setIsFavorite(favoriteStatus);
        console.log(
          "parkingLotId",
          parkingLotId,
          "isFavorite:",
          isFavorite,
          "주차장 이름:",
          prkplceNm
        );
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
      <Text style={styles.buttonText}>{isFavorite ? "★" : "★"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 32,
    paddingBottom: 2,
    borderRadius: 20,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  buttonFavorite: {
    backgroundColor: "lightgray",
  },
  buttonNotFavorite: {
    backgroundColor: "lightblue",
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    marginBottom: 1,
  },
});
export default CheckFavorite;

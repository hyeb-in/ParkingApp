import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import database from "@react-native-firebase/database";
import CheckFavorite from "../components/CheckFavorite";
import auth from "@react-native-firebase/auth";

const FavoriteList = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  // const getFavorites = async () => {
  //   try {
  //     const user = auth().currentUser;
  //     if (user) {
  //       const favoritesSnapshot = await databaseRef
  //         .child(`users/${user.uid}/favorites`)
  //         .once("value");
  //       const favoritesData = favoritesSnapshot.val();
  //       if (favoritesData) {
  //         const favoritesList = Object.keys(favoritesData);
  //         setFavorites(favoritesList);
  //       }
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.log("Error fetching favorites:", error);
  //     setLoading(false);
  //   }
  // };

  const getFavorites = async () => {
    const user = auth().currentUser;
    const favoritesRef = database().ref(`users/${user.uid}/favorites`);
    if (user) {
      try {
        const snapshot = await favoritesRef.once("value");

        const data = snapshot.val();

        const myFavorites = data
          ? Object.keys(data).map((key) => ({
              id: key,
              prkplceNm: data[key].prkplceNm,
            }))
          : [];

        setFavorites(myFavorites);
        console.log(favorites);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const handleFavoriteRemove = async (prkplceNm) => {
  //   try {
  //     const user = auth().currentUser;
  //     if (user) {
  //       await databaseRef
  //         .child(`users/${user.uid}/favorites/${prkplceNm}`)
  //         .remove();
  //       setFavorites((prevFavorites) =>
  //         prevFavorites.filter((item) => item !== prkplceNm)
  //       );
  //     }
  //   } catch (error) {
  //     console.log("Error removing favorite:", error);
  //   }
  // };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 30 }} />;
  }

  if (favorites.length === 0) {
    return <Text>No favorites found.</Text>;
  }
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={{ fontSize: 20 }}>{item.prkplceNm}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={favorites}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default FavoriteList;

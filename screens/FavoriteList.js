import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { databaseRef } from "../firebase/realtimedb";
import CheckFavorite from "../components/CheckFavorite";
import auth from "@react-native-firebase/auth";

const FavoriteList = () => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const favoritesSnapshot = await databaseRef
          .child(`users/${user.uid}/favorites`)
          .once("value");
        const favoritesData = favoritesSnapshot.val();
        if (favoritesData) {
          const favoritesList = Object.keys(favoritesData);
          setFavorites(favoritesList);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching favorites:", error);
      setLoading(false);
    }
  };

  const handleFavoriteRemove = async (prkplceNm) => {
    try {
      const user = auth().currentUser;
      if (user) {
        await databaseRef.child(`users/${user.uid}/favorites/${prkplceNm}`).remove();
        setFavorites((prevFavorites) => prevFavorites.filter((item) => item !== prkplceNm));
      }
    } catch (error) {
      console.log("Error removing favorite:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 30 }} />;
  }

  if (favorites.length === 0) {
    return <Text>No favorites found.</Text>;
  }

  return (
    <View>
      <FlatList
        style={{ marginTop: 20, marginLeft: 20 }}
        data={favorites}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckFavorite prkplceNm={item} />
            <Text style={{ marginLeft: 10 }}>{item}</Text>
            <TouchableOpacity onPress={() => handleFavoriteRemove(item)}>
              <Text style={{ color: "red", marginLeft: 10, fontSize: 20 }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default FavoriteList;

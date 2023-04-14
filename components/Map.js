import styled from "styled-components/native";
import { View } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { TextInput } from "react-native";
import Search from "./Search";
<<<<<<< HEAD
import Tab from "./Tab";
=======
import BottomTabNavigationApp from "./Tab";
>>>>>>> 535f32f572aaa5a59ab694073affba52f54235b9

const Container = styled.View``;
const Text = styled.Text``;
const Btn = styled.TouchableOpacity``;
const BtnText = styled.Text``;

// const logOut = () => {
//   auth().signOut();
// };

const MapScreen = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongtitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    try {
      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setLatitude(latitude);
      setLongtitude(longitude);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  {
    console.log(loading, latitude, longitude);
  }
  if (loading) {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color="black"
          style={{ marginTop: 350 }}
        />
      </View>
    );
  } else {
    return (
      <>
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1, width: "100%", height: "100%" }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <Search />
<<<<<<< HEAD
          <Tab />
=======
          <BottomTabNavigationApp />
>>>>>>> 535f32f572aaa5a59ab694073affba52f54235b9
        </View>
        {console.log(loading, latitude, longitude)}
      </>
    );
  }
};

export default MapScreen;

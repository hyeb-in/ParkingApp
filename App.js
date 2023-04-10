import { StatusBar } from "expo-status-bar";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import LogInNav from "./navigators/LogInNav";
import LogOutNav from "./navigators/LogOutNav";
import styled from "styled-components/native";
import * as Location from "expo-location";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Container = styled.View``;
const View = styled.View``;
const Text = styled.Text``;
const Nav = createNativeStackNavigator();

export default function App() {
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
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setIsLoggedIn(true);
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   });
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View>
          <Text>Loading.. </Text>
        </View>
      ) : (
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )}
      {console.log(latitude, longitude)}
    </View>
  );
  // return <MapGoogle></MapGoogle>;

  // <NavigationContainer>
  //   {isLoggedIn ? <LogInNav /> : <LogOutNav />}
  // </NavigationContainer>
}

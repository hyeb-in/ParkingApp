import styled from "styled-components/native";
import { View } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { TextInput } from "react-native";
import Search from "./Search";

const Container = styled.View``;
const Text = styled.Text``;
const Btn = styled.TouchableOpacity``;
const BtnText = styled.Text``;

const mapStyle = [
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

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

      setLatitude(37.5830);
      setLongtitude(127.0106);
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
            style={{ ...mapStyle, flex: 1, width: "100%", height: "100%" }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            customMapStyle={mapStyle}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.008,
            }}
          >
            {/* 아래는 마커 코드 latitude, longitude이용해서 위치 하면 될 듯,, */}
            {/* <Marker
              coordinate={{ latitude, longitude }}
              title="this is a marker"
              description="this is a marker example"
            /> */}
          </MapView>
          <Search />
        </View>
        {console.log(loading, latitude, longitude)}
      </>
    );
  }
};

export default MapScreen;

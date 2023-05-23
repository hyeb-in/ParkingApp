import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator } from "react-native";
import { REACT_APP_OPEN_API_KEY } from "@env";

const Text = styled.Text``;

const mapStyle = [
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const Map = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongtitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [parkingInfo, setParkingInfo] = useState();

  const mapViewRef = useRef(null);

  const API_KEY = REACT_APP_OPEN_API_KEY;

  const getMarker = async () => {
    const baseUrl = `http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api`;

    const params = {
      serviceKey: API_KEY,

      numOfRows: 1000,
      type: "json",
    };

    const queryString = new URLSearchParams(params).toString();
    const reqUrl = `${baseUrl}?${queryString}`;

    try {
      const response = await fetch(reqUrl);
      const json = await response.json();
      const result = json.response.body.items;
      setParkingInfo(result);
      //console.log("데이터", result);
    } catch (e) {
      console.log("error", e);
    }
  };

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

      // setLatitude(37.583);
      // setLongtitude(127.0106);
      setLatitude(latitude);
      setLongtitude(longitude);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const showMyCurrentLocation = () => {
    if (latitude && longitude) {
      mapViewRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.008,
      });
    }
  };

  useEffect(() => {
    getLocation();
    getMarker();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
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
        <MapView
          ref={mapViewRef}
          style={{ flex: 1, width: "100%", height: "100%" }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.008,
          }}
          showsUserLocation={true}
        >
          {/* {parkingInfo &&
            parkingInfo.map((item, index) => (
              <Marker
                kdy={index}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title="this is a marker"
                description="this is a marker example"
              />
            ))} */}

          {/* 아래는 마커 코드 latitude, longitude이용해서 위치 하면 될 듯,, */}
          {/* <Marker
              coordinate={{ latitude, longitude }}
              title="this is a marker"
              description="this is a marker example"
            /> */}
        </MapView>
        <TouchableOpacity onPress={showMyCurrentLocation}>
          <Text>현재위치</Text>
        </TouchableOpacity>

        {console.log(loading, latitude, longitude)}
      </>
    );
  }
};

export default Map;

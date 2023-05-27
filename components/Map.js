import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator } from "react-native";
import { REACT_APP_OPEN_API_KEY } from "@env";
import { databaseRef } from "../firebase/realtimedb";
import Fuse from "fuse.js";

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
  //const [parkingInfo, setParkingInfo] = useState();
  const [markerInfo, setMarkerInfo] = useState();

  const mapViewRef = useRef(null);

  const API_KEY = REACT_APP_OPEN_API_KEY;

  // const getMarkerAPi = async () => {
  //   const baseUrl = `http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api`;

  //   const params = {
  //     serviceKey: API_KEY,

  //     numOfRows: 1000,
  //     type: "json",
  //   };

  //   const queryString = new URLSearchParams(params).toString();
  //   const reqUrl = `${baseUrl}?${queryString}`;

  //   try {
  //     const response = await fetch(reqUrl);
  //     const json = await response.json();
  //     const result = json.response.body.items;
  //     setParkingInfo(result);
  //     //console.log("데이터", result);
  //   } catch (e) {
  //     console.log("error", e);
  //   }
  // };

  const getMarker = async () => {
    const markerRegion = "서울특별시 성북구";

    try {
      const snapshot = await databaseRef
        .child("records")
        .orderByChild("address_name")
        .startAt(markerRegion)
        .endAt(markerRegion + "\uf8ff'")
        .once("value");
      const data = snapshot.val();

      const indexData = Object.keys(data).map((key) => ({
        id: key,
        // roadadr: data[key].roadadr, //도로명지번주소
        // numadr: data[key].numadr, //소재지지번주소
        latitude: data[key].latitude,
        longitude: data[key].longitude,
        address_name: data[key].address_name,
        prkplceNm: data[key].prkplceNm, //주차장 이름
      }));

      //아래 options 통해서 필터링
      //threshold 유사도 (0~1)
      // minMatchCharLength 최소로 일치해야할 단어 수 (검색어랑 길이 다르면 이상한 거까지 나와서 걍 검색어 수로 맞춰두면 될 듯)
      const options = {
        keys: ["address_name"],
        threshold: 0.7,
        minMatchCharLength: markerRegion.length,
      };

      //검색 필터 라이브러리 indextData에서 options로 필터링하는 것,
      const fuse = new Fuse(indexData, options);
      const results = fuse.search(markerRegion);
      // console.log(query.length);
      // console.log(results);
      setMarkerInfo(results);
      console.log("마커", results);
    } catch (error) {
      console.log(error);
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
        latitude: 37.5862,
        longitude: 127.0101,
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
            latitudeDelta: 0.01,
            longitudeDelta: 0.007,
          }}
          showsUserLocation={true}
        >
          {/* {parkingInfo &&
            parkingInfo.map((item, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title="this is a marker"
                description="this is a marker example"
              />
            ))} */}

          {markerInfo &&
            markerInfo.map((item, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(item.item.latitude),
                  longitude: parseFloat(item.item.longitude),
                }}
                title={item.prkplceNm}
                description="this is a marker example"
              />
            ))}

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

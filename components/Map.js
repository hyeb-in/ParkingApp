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
        latitude,
        longitude,
        // latitudeDelta: 0.02,
        // longitudeDelta: 0.007,
        latitudeDelta: 0.015,
        longitudeDelta: 0.008,
      });
    }
  };

  useEffect(() => {
    getLocation();
    //getMarker();
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
            // latitudeDelta: 0.02,
            // longitudeDelta: 0.006,
            latitudeDelta: 0.015,
            longitudeDelta: 0.008,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{ longitude: 127.010315, latitude: 37.582649 }}
            title="한성대학교 주차장"
            description=""
          />

          <Marker
            coordinate={{ longitude: 127.011447, latitude: 37.5822525 }}
            title="한성여자고등학교 주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 127.010339, latitude: 37.5886676 }}
            title=" 삼선교 민영 주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 127.007746, latitude: 37.5886497 }}
            title="청암빌딩주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 127.004949, latitude: 37.5877038 }}
            title="제이에스원 오피스텔 민영 주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 127.00324, latitude: 37.5909384 }}
            title="성북동 주민센터 주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 127.007372, latitude: 37.5847034 }}
            title="삼선동 공영주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 127.016804, latitude: 37.5894328 }}
            title="성북구청주차장"
            description=""
          />

          <Marker
            coordinate={{ longitude: 127.004689, latitude: 37.5881543 }}
            title="성북 민영 주차장"
            description=""
          />

          <Marker
            coordinate={{ longitude: 127.004881, latitude: 37.5890283 }}
            title="청우빌딩 유료 주차장"
            description=""
          />

          <Marker
            coordinate={{ longitude: 127.005312, latitude: 37.5921547 }}
            title="포시즌 공유 주차장,"
            description=""
          />

          <Marker
            coordinate={{ longitude: 127.000918, latitude: 37.5930017 }}
            title="신한은행 주차장"
            description=""
          />

          <Marker
            coordinate={{ longitude: 126.998778, latitude: 37.6027233 }}
            title="북악골프연습장주차장"
            description=""
          />

          <Marker
            coordinate={{ longitude: 126.993354, latitude: 37.6000651 }}
            title="한국가구박물관 주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 126.984295, latitude: 37.5978477 }}
            title="길상사 주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 126.989244, latitude: 37.5954067 }}
            title="성북동 우리마을공동제9호주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 126.993751, latitude: 37.5948575 }}
            title="성북동길공영주차장"
            description=""
          />

          <Marker
            coordinate={{ longitude: 126.992766, latitude: 37.5948484 }}
            title="복사골 IoT 공유주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 126.993332, latitude: 37.5945241 }}
            title="성북설렁탕 전용 주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 126.994453, latitude: 37.5947854 }}
            title="성북로 138 유료주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 126.995427, latitude: 37.5935061 }}
            title="쌍다리돼지불백 본점 주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 126.999707, latitude: 37.5944703 }}
            title="성북 민영 주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 127.000114, latitude: 37.5948126 }}
            title="성북유료주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 126.99999, latitude: 37.5935242 }}
            title="현대빌딩 지하주차장,"
            description=""
          />
          <Marker
            coordinate={{ longitude: 127.007962, latitude: 37.5958036 }}
            title="성북구민회관주차장"
            description=""
          />

          <Marker
            coordinate={{ longitude: 127.013361, latitude: 37.5834776 }}
            title="삼선대우푸르지오아파트 주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 127.006239, latitude: 37.5803427 }}
            title="낙산공원주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 127.007756, latitude: 37.5804778 }}
            title="낙산공원 전시관"
            description=""
          />
          <Marker
            coordinate={{ longitude: 127.014673, latitude: 37.5779724 }}
            title="창신3동 주민센터 주차장"
            description=""
          />
          <Marker
            coordinate={{ longitude: 127.015613, latitude: 37.5778192 }}
            title="숭인제1공영주차장"
            description=""
          />

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

          {/* {markerInfo &&
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
            ))} */}
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

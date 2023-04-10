import styled from "styled-components";
import { View } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";

const Container = styled.View``;
const Text = styled.Text``;
const Btn = styled.TouchableOpacity``;
const BtnText = styled.Text``;

const MapGoogle = () => {
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
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Container>
      <View style={{ flex: 1 }}>
        {loading ? (
          <View>
            <Text>로딩중 </Text>
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
      </View>
    </Container>
  );
};

export default MapGoogle;

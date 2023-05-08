import styled from "styled-components/native";
import { View } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { TextInput } from "react-native";
import MapScreen from "../components/Map";
import Search from "../components/Search";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigationApp from "../components/Tab";

const Home = () => {
  return <BottomTabNavigationApp />;
};

export default Home;

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Home from "./screens/Home";

const Container = styled.View``;
const View = styled.View``;
const Text = styled.Text``;

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Home />
    </View>
  );
}

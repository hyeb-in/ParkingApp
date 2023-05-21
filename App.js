import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigationApp from "./navigators/Tab";
import Stack from "./navigators/Stack";
import Root from "./navigators/Root";

export default function App() {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
    // <View style={{ flex: 1 }}>
    //   <Home />
    //   <StatusBar style={{ color: "black" }} />
    // </View>
  );
}

import React, { TouchableOpacity, Text, View } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchList from "../screens/SearchList";
import ParkingLotDetails from "../screens/ParkingLotDetails";
import Join from "../screens/Join";
import Login from "../screens/Login";

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator>
    {/* <NativeStack.Screen name="Test" component={Test} /> */}
    <NativeStack.Screen
      name="SearchList"
      component={SearchList}
      options={{ title: " ", headerTransparent: true }}
    />
    <NativeStack.Screen
      name="ParkingLotDetails"
      component={ParkingLotDetails}
      options={{ title: " ", headerTransparent: true }}
    />
    <NativeStack.Screen
      name="Join"
      component={Join}
      options={{ title: "회원가입" }}
    />
  </NativeStack.Navigator>
);

export default Stack;

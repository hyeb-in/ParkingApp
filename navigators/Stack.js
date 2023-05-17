import React, { TouchableOpacity, Text, View } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchList from "../screens/SearchList";
import Test from "../screens/Test";

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator>
    {/* <NativeStack.Screen name="Test" component={Test} /> */}
    <NativeStack.Screen
      name="SearchList"
      component={SearchList}
      options={{ title: " ", headerTransparent: true }}
    />
  </NativeStack.Navigator>
);

export default Stack;

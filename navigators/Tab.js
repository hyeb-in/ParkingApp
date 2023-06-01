import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import MyPage from "../screens/MyPage";
import Home from "../screens/Home";
import auth from "@react-native-firebase/auth";
import Login from "../screens/Login";
import ParkingLotDetails from "../screens/ParkingLotDetails";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [islogin, setIsLogin] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setIsLogin(!!user);
    }, []);
  });

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "홈",
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={
          islogin ? MyPage : Login
          // ParkingLotDetails
        }
        options={{
          title: "마이 페이지",
          //headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, Text } from "react-native";
import MyPage from "../screens/MyPage";
import Home from "../screens/Home";
import auth from "@react-native-firebase/auth";
import Login from "../screens/Login";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [isLogin, setIsLogin] = useState(false);
  
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }, []);
  });
  console.log(islogin);

  const tabBarOptions = {
    showLabel: true, 
    style: {
      height: 100,
    },
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={tabBarOptions} // Migrate options to screenOptions
      tabBar={(props) => <CustomTabBar {...props} />} // Use the custom tab bar component
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "홈",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={
          isLogin
            ? MyPage
            : Login
        }
        options={{
          title: "마이 페이지",
        }}
      />
    </Tab.Navigator>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{ paddingVertical: 18, borderTopColor:  isFocused ? "#000000" : "#999999", borderTopWidth:1 }}
            >
            <Text style={{ color: isFocused ? "#000000" : "#999999", fontSize: 16 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Tabs;

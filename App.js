import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import LogInNav from "./navigators/LogInNav";
import LogOutNav from "./navigators/LogOutNav";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {isLoggedIn ? <LogInNav /> : <LogOutNav />}
    </NavigationContainer>
  );
}

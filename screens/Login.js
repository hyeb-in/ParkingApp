import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";

const LoginScreen = ({ navigation: { navigate } }) => {
  const Spacing = 10;
  const passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //로그인
  const loginSubmit = async () => {
    try {
      const logInUser = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      console.log("login.js", logInUser);
    } catch (e) {
      Alert.alert("잘못된 입력입니다.");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="  Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        returnKeyType="next"
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={() => passwordInput.current.focus()}
      />
      <TextInput
        ref={passwordInput}
        placeholder="  Password"
        secureTextEntry
        value={password}
        returnKeyType="next"
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={loginSubmit}
      />
      <TouchableOpacity onPress={loginSubmit}>
        <Text>  Log In</Text>
      </TouchableOpacity>
      <Text>
          회원가입
        <TouchableOpacity onPress={() => navigate("Stack", { screen: "Join" })}>
          <Text>  Join ➡️</Text>
        </TouchableOpacity>

        <View>
          <Text style={{ textAlign: "center" }}>
            <TouchableOpacity
              onPress={() => navigate("Stack", { screen: "Join" })}
            >
              <Text>회원가입하기</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

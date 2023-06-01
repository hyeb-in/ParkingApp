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
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import auth from "@react-native-firebase/auth";

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
      Alert.alert("error", e.message);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              //Family: Font["poppins-bold"],
              marginVertical: Spacing * 3,
            }}
          >
            <Image
              source={require("../assets/mouse.png")}
              style={{ width: 50, height: 50 }}
            />{" "}
            Login{" "}
            <Image
              source={require("../assets/mouse.png")}
              style={{ width: 50, height: 50 }}
            />
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <TextInput
            placeholder="Email"
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
            placeholder="Password"
            secureTextEntry
            value={password}
            returnKeyType="next"
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={loginSubmit}
          />
        </View>

        <TouchableOpacity
          onPress={loginSubmit}
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginTop: Spacing * 8,
            marginBottom: Spacing * 2,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          <Text
            style={{
              //fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            로그인
          </Text>
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
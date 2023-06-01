import React, { useRef, useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  ActivityIndicator,
  Alert,
  TextInput,
  Text,
  Touchable,
  View,
  TouchableOpacity,
} from "react-native";

//로그인 함수
const Login = ({ navigation: { navigate } }) => {
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
      console.log(logInUser);
    } catch (e) {
      Alert.alert(e.code);
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
      </Text>
    </View>
  );
};
export default Login;

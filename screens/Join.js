import React, { useReducer, useRef, useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  ActivityIndicator,
  Alert,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

const Join = () => {
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //회원가입 함수
  const joinSubmit = async () => {
    if (email === "" || password === "") {
      return Alert.alert("공백 채우기");
    } else if (password != confirmPassword) {
      return Alert.alert("비밀번호 불일치");
    }
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      //회원가입
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      Alert.alert(e.code);
    }
  };

  return (
    <View>
      {/* 이메일 */}
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
      {/* 비밀번호 */}
      <TextInput
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="next"
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={() => confirmPasswordInput.current.focus()}
      />
      {/* 비밀번호 확인 */}
      <TextInput
        ref={confirmPasswordInput}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        returnKeyType="done"
        onChangeText={(text) => setConfirmPassword(text)}
        onSubmitEditing={joinSubmit}
      />
      <TouchableOpacity onPress={joinSubmit}>
        {isLoading ? <ActivityIndicator /> : <Text> 회원가입 </Text>}
      </TouchableOpacity>
    </View>
  );
};

export default Join;

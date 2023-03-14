import React, { useRef, useState } from "react";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator, Alert, TextInput } from "react-native";
import styled from "styled-components/native";

const Container = styled.View``;
const Text = styled.Text``;
const Btn = styled.TouchableOpacity``;
const BtnText = styled.Text``;

const Login = ({ navigation: { navigate } }) => {
  const passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <Container>
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
      <Btn onPress={loginSubmit}>
        <BtnText>Log In</BtnText>
      </Btn>
      <Text>
        Don't have an account?{" "}
        <Btn onPress={() => navigate("Join")}>
          <BtnText>Join ➡️</BtnText>
        </Btn>
      </Text>
    </Container>
  );
};
export default Login;

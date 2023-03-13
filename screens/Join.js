import React, { useReducer, useRef, useState } from "react";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator, Alert, TextInput } from "react-native";
import styled from "styled-components/native";

const Container = styled.View``;
const Text = styled.Text``;
const Btn = styled.TouchableOpacity``;
const BtnText = styled.Text``;

const Join = () => {
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const joinSubmit = async () => {
    if (email === "" || password === "") {
      return Alert.alert("Fill in the form");
    } else if (password != confirmPassword) {
      return Alert.alert("password doesn't matched");
    }
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(userCredential);
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
        onSubmitEditing={() => confirmPasswordInput.current.focus()}
      />
      <TextInput
        ref={confirmPasswordInput}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        returnKeyType="done"
        onChangeText={(text) => setConfirmPassword(text)}
        onSubmitEditing={joinSubmit}
      />
      <Btn onPress={joinSubmit}>
        {loading ? <ActivityIndicator /> : <BtnText>Creat Account</BtnText>}
      </Btn>
    </Container>
  );
};

export default Join;

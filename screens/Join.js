import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import React, {useState, useRef} from "react";


import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";

const Join = ({ navigation: { navigate } }) => {
  const Spacing = 10;
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
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(userCredential);
    } catch (e) {
      //Alert.alert(e.code);
      Alert.alert("에러");
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
              marginBottom: Spacing*6.5,
            }}
          >
            <Image source={require('../assets/mouse.jpg')} style={{width: 50, height: 50}} />  Sign up  <Image source={require('../assets/mouse.jpg')} style={{width: 50, height: 50}} />
          </Text>

        </View>
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
  
    </View>


        <TouchableOpacity onPress={joinSubmit}
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
            회원가입
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default Join;

const styles = StyleSheet.create({});
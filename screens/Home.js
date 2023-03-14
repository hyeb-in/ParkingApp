import React from "react";
import auth from "@react-native-firebase/auth";
import styled from "styled-components";

const Container = styled.View``;
const Text = styled.Text``;
const Btn = styled.TouchableOpacity``;
const BtnText = styled.Text``;

const logOut = () => {
  auth().signOut();
};
const Home = () => (
  <Container>
    <Text>HOME</Text>
    <Btn onPress={logOut}>
      <BtnText>Log Out</BtnText>
    </Btn>
  </Container>
);

export default Home;

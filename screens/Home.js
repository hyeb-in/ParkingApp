import styled from "styled-components/native";
import { View } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { TextInput } from "react-native";
import MapScreen from "../components/Map";
import Search from "../components/Search";
import BottomTabNavigationApp from "../components/Tab";

const Home = () => {
  return <BottomTabNavigationApp />;
};

export default Home;

// const Container = styled.View``;
// const Text = styled.Text``;
// const Btn = styled.TouchableOpacity``;
// const BtnText = styled.Text``;

// // const logOut = () => {
// //   auth().signOut();
// // };

// const Home = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongtitude] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const getLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();

//     if (status !== "granted") {
//       setErrorMsg("Permission to access location was denied");
//       return;
//     }

//     try {
//       let {
//         coords: { latitude, longitude },
//       } = await Location.getCurrentPositionAsync();

//       setLatitude(latitude);
//       setLongtitude(longitude);
//       setLoading(false);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     getLocation();
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       {loading ? (
//         <ActivityIndicator
//           size="large"
//           color="black"
//           style={{ marginTop: 350 }}
//         />
//       ) : (
//         <>
//           <View style={{ marginTop: 30 }}>
//             <TextInput />
//           </View>
//           <MapView
//             style={{ flex: 5 }}
//             provider={PROVIDER_GOOGLE}
//             initialRegion={{
//               latitude: latitude,
//               longitude: longitude,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//           />
//         </>
//       )}
//       {console.log(loading, latitude, longitude)}
//     </View>
//   );
// };

// export default Home;


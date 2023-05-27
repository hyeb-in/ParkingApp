import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { databaseRef } from "../firebase/realtimedb";
import ParkingLotDetails from "./ParkingLotDetails"; // 이게 상세정보 페이지
import Stack from "../navigators/Stack";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';

//const NativeStack = createNativeStackNavigator();

const SearchList = ({ route })  => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  //const { text, region, navigation } = route.params;
  const { text, region } = route.params;
  const navigation = useNavigation();

  console.log("지역", region);
  // 아래 코드는 데이터 베이스 코드 (파이어베이스 용량 제한 때문에 )
  useEffect(() => {
    getParkingLotData();
  }, []);
  //realtime database, /records url에서 가져오기
  const getParkingLotData = async () => {
    try {
      const snapshot = await databaseRef
        .child("records")
        .orderByChild("roadadr")
        .startAt(region)
        .endAt(region + "\uf8ff'")
        .once("value");
      const data = snapshot.val();

      const indexData = Object.keys(data).map((key) => ({
        id: key,
        roadadr: data[key].roadadr, //도로명지번주소
        numadr: data[key].numadr, //소재지지번주소
        address: data[key].address_name,
        prkplceNm: data[key].prkplceNm, //주차장 이름
      }));

      // query = 검색어
      const query = text;

      //아래 options 통해서 필터링
      //threshold 유사도 (0~1)
      // minMatchCharLength 최소로 일치해야할 단어 수 (검색어랑 길이 다르면 이상한 거까지 나와서 걍 검색어 수로 맞춰두면 될 듯)
      const options = {
        keys: ["address"],
        threshold: 0.7,
        minMatchCharLength: query.length,
      };

      //검색 필터 라이브러리 indextData에서 options로 필터링하는 것,
      const fuse = new Fuse(indexData, options);
      const results = fuse.search(query);
      // console.log(query.length);
      // console.log(results);
      setResult(results);
      console.log("결과", result);
      console.log("테스트용 출력: ", data[0].prkplceNm)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const pressHandler = (prkplceNm, id, navigation) => { // 클릭 이벤트 핸들러
    console.log(navigation); // undefined
    if (navigation) { // 이게 안됨
      console.log("주차장명 = ", prkplceNm, ", id = ", id);
      navigation.navigate("Stack", {
        screen: "ParkingLotDetails",
        params: id,
      });
    }

  };

  // Define the renderItem function to render each item
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => pressHandler(item.item.prkplceNm, item.item.id, navigation)}>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 20 }}>{item.item.prkplceNm}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 30 }} />;
  }

  return (
    <FlatList
      style={{ marginTop: 70, marginLeft: 20 }}
      data={result}
      renderItem={renderItem}
      keyExtractor={(item) =>
        item.id ? item.id.toString() : Math.random().toString()
      }
    />
  );
};

export default SearchList;
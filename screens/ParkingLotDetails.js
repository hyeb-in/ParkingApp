import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import { databaseRef } from "../firebase/realtimedb";
import Gpio from "../components/Gpio";
import CheckFavorite from "../components/CheckFavorite";
import FavoriteList from "./FavoriteList";

const ParkingLotDetails = ({ route }) => {
  const [newReview, setNewReview] = useState("");
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const parkingLotId = 7250; //나중에 변수로 바꾸기
  //route.params;

  useEffect(() => {
    getParkingLotData();
    //checkFavoriteStatus();
  }, []);

  //realtime database, /records url에서 가져오기
  const getParkingLotData = async () => {
    try {
      const snapshot = await databaseRef
        .child(`/${parkingLotId}`)
        .once("value");
      const data = snapshot.val();
      setResult(data);
      setLoading(false);
      console.log(parkingLotId);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const saveReview = () => {
    const reviewRef = database().ref("reviews");
    const newReviewRef = reviewRef.push();
    newReviewRef
      .set({ text: newReview })
      .then(() => {
        console.log("Review saved successfully!");
        setNewReview("");
      })
      .catch((error) => {
        console.log("Error saving review:", error);
      });
  };

  const handleOccupiedSeatsChange = (newOccupiedSeats) => {
    setOccupiedSeats(Math.max(newOccupiedSeats, 0));
  };

  const submitReview = () => {
    saveReview();
  };

  // 클릭 이벤트를 텍스트에 적용하고 눌렸을 때는 추가적으로 정보를 더 볼 수 있도록 하기(기본값을 false)
  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Image
          source={require("../assets/car.png")}
          style={{ width: 30, height: 30 }}
        />{" "}
        {result.prkplceNm}
        <Text style={styles.small}> {result.prkplceSe}</Text>
        <CheckFavorite parkingLotId={parkingLotId} /> {/*즐겨찾기 버튼*/}
      </Text>

      {/* 주소 출력 */}
      {result.roadadr == null ? (
        <Text style={styles.address}><Image source={require('../assets/location_pin.png')} style={{width: 30, height: 30}} />{result.numadr}</Text>
      ) : (
        <Text style={styles.address}><Image source={require('../assets/location_pin.png')} style={{width: 30, height: 30}} />{result.roadadr}</Text>
      )}
      
      {/*잔여석 출력*/}
      <Text style={styles.occupied}> {`잔여석   `}
      <Text style={styles.occupiedN}>
        {`${Math.max(result.prkcmprt - occupiedSeats, 0)} `}
      </Text>
      <Text style={styles.occupied}>
        {`/ ${result.prkcmprt}석`}
        </Text>
      </Text>

      <Text style={styles.description}>{`운영요일 : ${result.operDay}`}</Text>
      <Text style={styles.description}>{`운영시간 : ${result.weekdayOperOpenHhmm} - ${result.weekdayOperColseHhmm}`}</Text>
      <View style={styles.table}>
        {/* Table Body */}

        <View style={styles.tableRowTop}>
          <Text style={styles.tableCell}>요금 안내</Text>
          <Text style={styles.tableCell}>기본 시간</Text>
          <Text style={styles.tableCell}>기본 요금</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>₩</Text>
          <Text style={styles.tableCell}>{`${result.basicTime}분`}</Text>
          <Text style={styles.tableCell}>{`${result.basicCharge}원`}</Text>
        </View>

        <Gpio onOccupiedSeatsChange={handleOccupiedSeatsChange} />
      </View>
      <TextInput
        style={{
          borderRadius: 5,
          color: "#000",
          borderColor: "#666",
          backgroundColor: "#FFF",
          borderWidth: 1,
          height: 45,
          paddingHorizontal: 10,
          fontSize: 18,
          width: '100%',
        }}
        placeholder={"리뷰 남기기"}
        placeholderTextColor={"#666"}
        onChangeText={(text) => setNewReview(text)}
        value={newReview}
        onSubmitEditing={submitReview}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
    marginRight:10,
  },
  small: {
    fontSize: 13,
    padding: 10,
    fontWeight: "normal",
    marginLeft: 50,
  },
  star: {
    alignItems: 'flex-end',
    marginLeft: 100,
  },
  address: {
    marginLeft: -7,
  },
  occupiedN: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  occupied: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft: -5,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 0,
  },
  description_right: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "right",
  },
  review: {
    fontSize: 16,
    marginBottom: 16,
    marginTop: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: "#BCE9B7",
    marginBottom: 20,
  },
  tableRowTop: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderColor: "#000",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ParkingLotDetails;

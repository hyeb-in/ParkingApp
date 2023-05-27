import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { firebase } from "@react-native-firebase/database";
import { databaseRef } from "../firebase/realtimedb";
import Gpio from '../components/Gpio';

const ParkingLotDetails = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState(0);

  const parkingLotId = route.params;
  const database = firebase.database().ref(`records/${parkingLotId}`);

  useEffect(() => {
    getParkingLotData();
  }, []);

  const getParkingLotData = async () => {
    try {
      const snapshot = await databaseRef
        .child(`records/${parkingLotId}`)
        .once("value");
      const data = snapshot.val();
      setResult(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleOccupiedSeatsChange = (newOccupiedSeats) => {
    setOccupiedSeats(Math.max(newOccupiedSeats, 0));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{result.prkplceNm}<Text style={styles.small}>   {result.prkplceSe}</Text></Text>
      <Text style={styles.description}>{result.address_name}</Text>
      <Text style={styles.description}>{`운영요일: ${result.operDay}`}</Text>
      <Text style={styles.description}>{`운영시간: ${result.weekdayOperOpenHhmm} - ${result.weekdayOperColseHhmm}`}</Text>
      <Text style={styles.description}>{`잔여: ${Math.max(result.prkcmprt - occupiedSeats, 0)}석/${result.prkcmprt}석`}</Text>
      <View style={styles.table}>
        <View style={styles.tableRowTop}>
          <Text style={styles.tableCell}>요금 안내</Text>
          <Text style={styles.tableCell}>기본 시간</Text>
          <Text style={styles.tableCell}>기본 요금</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}></Text>
          <Text style={styles.tableCell}>{`${result.basicTime}시간`}</Text>
          <Text style={styles.tableCell}>{`${result.basicCharge}원`}</Text>
        </View>
      </View>
      <Gpio onOccupiedSeatsChange={handleOccupiedSeatsChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 60,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom:8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  description_right: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'right',
  },
  review: {
    fontSize: 16,
    marginBottom: 16,
    marginTop: 20,
  },
  table: {
    borderWidth: 0,
    borderColor: '#000',
    borderRadius: 2,
    marginVertical: 10,
    backgroundColor: '#BCE9B7',
  },
  tableRowTop: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderColor: '#000',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
  },
  small: {
    fontSize: 13,
    padding: 10,
    fontWeight: 'normal',
  }
});

export default ParkingLotDetails;

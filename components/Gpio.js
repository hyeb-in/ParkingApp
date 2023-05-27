import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import database from '@react-native-firebase/database';

const Gpio = ({ onOccupiedSeatsChange }) => { // onOccupiedSeatsChange 콜백 함수 추가
  const [distInValue, setDistInValue] = useState(null);
  const [distOutValue, setDistOutValue] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState(0);

  useEffect(() => {
    const databaseRef = database().ref('/dist');
    const listener = databaseRef.on('value', (snapshot) => {
      const distValue = snapshot.val();
      if (distValue) {
        setDistInValue(distValue.distance_in);
        console.log('Distance_in:', distValue.distance_in);
        setDistOutValue(distValue.distance_out);
        console.log('Distance_out:', distValue.distance_out);

        if (distValue.distance_in < 30.0) {
          setOccupiedSeats((prevSeats) => prevSeats + 1);
        } else if (distValue.distance_out < 30.0) {
          setOccupiedSeats((prevSeats) => prevSeats - 1);
        }
      }
    });

    return () => {
      databaseRef.off('value', listener);
    };
  }, []);

  // occupiedSeats 값이 변경될 때마다 onOccupiedSeatsChange 콜백 호출
  useEffect(() => {
    onOccupiedSeatsChange(occupiedSeats);
  }, [occupiedSeats, onOccupiedSeatsChange]);

  // return (
  //   <View>
  //     <Text>{Number(occupiedSeats)}</Text>
  //   </View>
  // );
};

export default Gpio;
import styled from "styled-components/native";
import { View, TextInput, Text } from "react-native";
import { useEffect, useState } from "react";
import { REACT_APP_OPEN_API_KEY } from "@env";

const Search = () => {
  const getParkingLotData = async () => {
    const baseUrl = `http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api`;

    const API_KEY = REACT_APP_OPEN_API_KEY;

    const params = {
      serviceKey: API_KEY,
      pageNo: 1,
      numOfRows: 2,
      type: "json",
      lnmadr: "경상북도 포항시 남구 대도동 127-13",
    };

    const paramsRDN = {
      serviceKey: API_KEY,
      numOfRows: 10,
      type: "json",
      rdnmadr:"포항"
    };

    const queryString = new URLSearchParams(params).toString();
    //const queryStringRDN = new URLSearchParams(paramsRDN).toString();
    const requrl = `${baseUrl}?${queryString}`;
    //const reqUrlRND = `${baseUrl}?${queryStringRDN}`;
    console.log("url", requrl);
    //console.log(reqUrlRND);

    try {
      const response = await fetch(requrl);
      console.log("try 문 안에 url", requrl);
      const json = await response.json();
      console.log("데이터", json.response.body.items);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    getParkingLotData();
  }, []);
  const [text, setText] = useState("");

  const onChangeText = (content) => {
    console.log(content);
    setText(content);
  };

  const submitText = () => {
    setText("");
    getParkingLotData();
  };
  return (
    <View style={{ position: "absolute", top: 10, width: "100%" }}>
      <TextInput
        style={{
          borderRadius: 10,
          marginTop: 30,
          marginLeft: 10,
          marginRight: 10,
          color: "#000",
          borderColor: "#666",
          backgroundColor: "#FFF",
          borderWidth: 1,
          height: 45,
          paddingHorizontal: 10,
          fontSize: 18,
        }}
        placeholder={"Search"}
        placeholderTextColor={"#666"}
        onChangeText={onChangeText}
        value={text}
        onSubmitEditing={submitText}
      />
    </View>
  );
};

export default Search;

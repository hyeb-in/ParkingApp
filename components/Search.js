import styled from "styled-components/native";
import { View, TextInput, Text } from "react-native";
import { useEffect, useState } from "react";

//https://velog.io/@diorjj/fetch%ED%95%A8%EC%88%98%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-get%EC%9A%94%EC%B2%AD%EC%8B%9C-%EC%97%AC%EB%9F%AC%EA%B0%9C%EC%9D%98-params%EA%B0%80-%ED%95%84%EC%9A%94%ED%95%A0%EA%B2%BD%EC%9A%B0-%EC%9A%94%EC%B2%AD%EC%BD%94%EB%93%9C
//https://reactnative.dev/docs/network
//docs 참고
//이거 안되면 대신에에
//axios 사용 해보기

const Search = () => {
  const getParkingLotData = async () => {
    const baseUrl = `http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api`;

    const API_KEY =
      //인코딩
      "VG1OYuAFTveEIiNphJmDlXlSYGed9bMGgLaegyaA0dP14%2FSLiDk07RHpY3oVATlh9XAiTEJ%2B11mQBoqcwEy%2F%2BA%3D%3D";
    // 디코딩 "VG1OYuAFTveEIiNphJmDlXlSYGed9bMGgLaegyaA0dP14/SLiDk07RHpY3oVATlh9XAiTEJ+11mQBoqcwEy/+A==";

    const params = {
      serviceKey: API_KEY,
      numOfRows: 10,
      type: "json",
    };
    console.log(API_KEY);
    const queryString = new URLSearchParams(params).toString();
    const requrl = `${baseUrl}?${queryString}`;
    console.log(requrl);

    try {
      const response = await fetch(requrl);
      const json = await response.json();
      console.log(json);
    } catch (e) {
      console.log(e);
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

import { View, TextInput, Text } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

const Search = (props) => {
  const { navigation } = props;
  const [text, setText] = useState("");
  const [region, setRegion] = useState("서울");
  console.log("region :", region);
  // const getParkingLotData = () => {
  //   SearchList(text);
  //   navigation.navigate("Stack", { screen: "SearchList" });
  // };

  // useEffect(() => {
  //   getParkingLotData();
  // }, []);

  const onChangeText = (content) => {
    console.log(content);
    setText(content);
  };

  const submitText = () => {
    setText("");
    navigation.navigate("Stack", {
      screen: "SearchList",
      params: { text, region },
    });
  };
  return (
    <View
      style={{
        position: "absolute",
        top: 10,
        flexDirection: "row",
        alignContent: "center",
        marginTop: 30,
        justifyContent: "center",
      }}
    >
      <Picker
        mode="dialog"
        prompt="도시선택"
        style={{
          width: 110,
          height: 45,
        }} // Adjust the width as needed
        selectedValue={region}
        onValueChange={(value) => setRegion(value)}
      >
        {/* <Picker.Item label="도시" value=" " /> */}

        <Picker.Item label="서울" value="서울특별시" />
        <Picker.Item label="인천" value="인천광역시" />
        <Picker.Item label="경기" value="경기도" />
        <Picker.Item label="강원" value="강원도" />
        <Picker.Item label="경남" value="경상남도" />
        <Picker.Item label="경북" value="경상북도" />
        <Picker.Item label="광주" value="광주광역시" />
        <Picker.Item label="대구" value="대구광역시" />
        <Picker.Item label="대전" value="대전광역시" />
        <Picker.Item label="부산" value="부산광역시" />
        <Picker.Item label="세종" value="세종특별자치시" />
        <Picker.Item label="울산" value="울산광역시" />
        <Picker.Item label="전남" value="전라남도" />
        <Picker.Item label="전북" value="전라북도" />
        <Picker.Item label="제주" value="제주특별자치도" />
        <Picker.Item label="충남" value="충정남도" />
        <Picker.Item label="충북" value="충청북도" />
      </Picker>

      <TextInput
        style={{
          borderRadius: 10,
          color: "#000",
          borderColor: "#666",
          backgroundColor: "#FFF",
          borderWidth: 1,
          height: 45,
          paddingHorizontal: 10,
          fontSize: 18,
          width: 250,
        }}
        placeholder={"목적지로 검색하세요"}
        placeholderTextColor={"#666"}
        onChangeText={onChangeText}
        value={text}
        onSubmitEditing={submitText}
      />
    </View>
  );
};

export default Search;

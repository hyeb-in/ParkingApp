import styled from "styled-components/native";
import { View, TextInput, Text } from "react-native";
import { useState } from "react";

const Search = () => {
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

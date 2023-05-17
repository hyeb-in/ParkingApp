import { View, TextInput, Text, FlatList } from "react-native";
import database, { firebase } from "@react-native-firebase/database";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchList = ({ route }) => {
  //   const [loading, setLoading] = useState(true);
  //   const [result, setResult] = useState([]);
  //   const text = route.params.searchText;

  //   // 아래 코드는 데이터 베이스 코드 (파이어베이스 용량 제한 때문에 )
  //   useEffect(() => {
  //     getParkingLotData();
  //   }, []);
  //   //realtime database, /records url에서 가져오기
  //   const getParkingLotData = async () => {
  //     const database = firebase.database().ref("records");

  //     try {
  //       const snapshot = await database.once("value");
  //       const data = snapshot.val();

  //       const indexData = Object.keys(data).map((key) => ({
  //         id: key,
  //         roadadr: data[key].roadadr,
  //         numadr: data[key].numadr,
  //       }));

  //       // query = 검색어
  //       const query = text;

  //       //아래 options 통해서 필터링
  //       //threshold 유사도 (0~1)
  //       // minMatchCharLength 최소로 일치해야할 단어 수 (검색어랑 길이 다르면 이상한 거까지 나와서 걍 검색어 수로 맞춰두면 될 듯)
  //       const options = {
  //         keys: ["roadadr", "numadr"],
  //         threshold: 1,
  //         minMatchCharLength: query.length,
  //       };

  //       //검색 필터 라이브러리 indextData에서 options로 필터링하는 것,
  //       const fuse = new Fuse(indexData, options);
  //       const results = fuse.search(query);
  //       console.log(query.length);
  //       console.log(results);
  //       setResult(results);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };

  //   // Define the renderItem function to render each item
  //   const renderItem = ({ item }) => {
  //     return (
  //       <View>
  //         <Text>{item.item.roadadr}</Text>
  //         <Text>{item.item.numadr}</Text>
  //       </View>
  //     );
  //   };

  //   if (loading) {
  //     return <Text>Loading...</Text>;
  //   }

  //   return (
  //     <SafeAreaView>
  //       <FlatList
  //         data={result}
  //         renderItem={renderItem}
  //         keyExtractor={(item) => item.id}
  //       />
  //     </SafeAreaView>
  //   );
  const text = route.params.searchText;
  const data = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
    { id: "4", name: text },
    // Add more items as needed
  ];

  // Define the renderItem function to render each item
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ marginTop: 50 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};
export default SearchList;

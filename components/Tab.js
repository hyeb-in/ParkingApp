import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
<<<<<<< HEAD
=======
import MapScreen from "./Map";
>>>>>>> 535f32f572aaa5a59ab694073affba52f54235b9

const Tab = createBottomTabNavigator();

function HomeScreen() {
<<<<<<< HEAD
  return <Text>홈 내용</Text>; //Map.js 넣을 것
}

function MyPageScreen() {
  return <Text>마이페이지 내용</Text>; // 이 줄 빼고 마이페이지 화면 구성할 것
=======
  return <Text>Home</Text>;
}

// function SearchScrreen() {              //알림
//   return <Text>Search</Text>;
// }

// function NotificationScreen() {        // 검색
//   return <Text>Notification</Text>;
// }

function MessageScreen() {
  return <Text>MyPage</Text>;
>>>>>>> 535f32f572aaa5a59ab694073affba52f54235b9
}

function BottomTabNavigationApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
<<<<<<< HEAD
           options={{
             title: '홈',
             headerShown: false,
             tabBarLabelPosition: 'beside-icon',
             tabBarIcon: ({color, size}) => (
               <Icon name="home" color={color} size={size} />
             ),
           }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{
            title: '마이 페이지',
            //headerShown: false,
            tabBarLabelPosition: 'beside-icon',
=======
          options={{
            title: '홈',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        
        {/* <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: '알림',
            tabBarIcon: ({color, size}) => (
              <Icon name="notifications" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            title: '검색',
            tabBarIcon: ({color, size}) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
        /> */}

        <Tab.Screen
          name="MyPage"
          component={MessageScreen}
          options={{
            title: 'My Page',
>>>>>>> 535f32f572aaa5a59ab694073affba52f54235b9
            tabBarIcon: ({color, size}) => (
              <Icon name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
<<<<<<< HEAD
  );
}

=======
  );  
}

const MainScreen = () => {
  <View>
    <Search />
    <MapScreen />
  </View>
}
>>>>>>> 535f32f572aaa5a59ab694073affba52f54235b9
export default BottomTabNavigationApp;
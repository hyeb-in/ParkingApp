import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return <Text>홈 내용</Text>; //Map.js 넣을 것
}

function MyPageScreen() {
  return <Text>마이페이지 내용</Text>; // 이 줄 빼고 마이페이지 화면 구성할 것
}

function BottomTabNavigationApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
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
            tabBarIcon: ({color, size}) => (
              <Icon name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomTabNavigationApp;
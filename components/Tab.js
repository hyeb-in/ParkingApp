import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapScreen from "./Map";

const Tab = createBottomTabNavigator();

function HomeScreen() {
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
            tabBarIcon: ({color, size}) => (
              <Icon name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );  
}

const MainScreen = () => {
  <View>
    <Search />
    <MapScreen />
  </View>
}
export default BottomTabNavigationApp;
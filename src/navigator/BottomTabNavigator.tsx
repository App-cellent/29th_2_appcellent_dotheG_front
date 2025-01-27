/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SvgXml } from 'react-native-svg';

import HomeScreen from '../screens/Home/HomeScreen';
import TodayQuizGuideScreen from '../screens/Home/Quiz/TodayQuizGuideScreen';
import TodayQuiz1Screen from '../screens/Home/Quiz/TodayQuiz1Screen';
import TodayQuiz2Screen from '../screens/Home/Quiz/TodayQuiz2Screen';
import TodayQuiz3Screen from '../screens/Home/Quiz/TodayQuiz3Screen';
import TodayQuizCorrectScreen from '../screens/Home/Quiz/TodayQuizCorrectScreen';
import TodayQuizWrongScreen from '../screens/Home/Quiz/TodayQuizWrongScreen';
import PedometerScreen from '../screens/Pedometer/PedometerScreen';
import CharacterScreen from '../screens/Character/CharacterScreen';
import ListScreen from '../screens/Character/ListScreen';
import ReportScreen from '../screens/Report/ReportScreen';
import MyScreen from '../screens/My/MyScreen';

import HomeIcon from '../img/Navigator/HomeIcon.svg';
import PedometerIcon from '../img/Navigator/PedometerIcon.svg';
import CharacterIcon from '../img/Navigator/CharacterIcon.svg';
import ReportIcon from '../img/Navigator/ReportIcon.svg';
import MyIcon from '../img/Navigator/MyIcon.svg';
import HomeActiveIcon from '../img/Navigator/HomeActiveIcon.svg';
import PedometerActiveIcon from '../img/Navigator/PedometerActiveIcon.svg';
import CharacterActiveIcon from '../img/Navigator/CharacterActiveIcon.svg';
import ReportActiveIcon from '../img/Navigator/ReportActiveIcon.svg';
import MyActiveIcon from '../img/Navigator/MyActiveIcon.svg';

// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CharacterStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CharacterScreen" component={CharacterScreen} />
      <Stack.Screen name="ListScreen" component={ListScreen} />
    </Stack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TodayQuizGuideScreen" component={TodayQuizGuideScreen} />
      <Stack.Screen name="TodayQuiz1Screen" component={TodayQuiz1Screen} />
      <Stack.Screen name="TodayQuiz2Screen" component={TodayQuiz2Screen} />
      <Stack.Screen name="TodayQuiz3Screen" component={TodayQuiz3Screen} />
      <Stack.Screen name="TodayQuizCorrectScreen" component={TodayQuizCorrectScreen} />
      <Stack.Screen name="TodayQuizWrongScreen" component={TodayQuizWrongScreen} />
    </Stack.Navigator>
  );
}

function BottomTabNavigator(): React.JSX.Element {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => {
        const isQuizScreen = ["TodayQuizGuideScreen", "TodayQuiz1Screen", "TodayQuiz2Screen", "TodayQuiz3Screen", "TodayQuizCorrectScreen", "TodayQuizWrongScreen"].includes(route.name);
        return {
          tabBarStyle: isQuizScreen ? { display: "none" } : {
            height: 70,
            elevation: 0,
          },
          tabBarActiveTintColor: '#69E6A2',
          tabBarInactiveTintColor: '#D9D9D9',
          tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '800',
              paddingTop: 5,
          },
          tabBarItemStyle: {
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 5,
          },
          headerShown: false,
        };
      }}
    >

      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          title: '홈',
          tabBarIcon: ({ focused }) => (
            focused ? <HomeActiveIcon width={24} height={24} /> : <HomeIcon width={24} height={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Pedometer"
        component={PedometerScreen}
        options={{
          title: '만보기',
          tabBarIcon: ({ focused }) => (
            focused ? <PedometerActiveIcon width={24} height={24} /> : <PedometerIcon width={24} height={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Character"
        component={CharacterStackNavigator}
        options={{
          title: '캐릭터',
          tabBarIcon: ({ focused }) => (
            focused ? <CharacterActiveIcon width={24} height={24} /> : <CharacterIcon width={24} height={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          title: '성과보고서',
          tabBarIcon: ({ focused }) => (
            focused ? <ReportActiveIcon width={24} height={24} /> : <ReportIcon width={24} height={24} />
          ),
        }}
      />
      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{
          title: '마이페이지',
          tabBarIcon: ({ focused }) => (
            focused ? <MyActiveIcon width={24} height={24} /> : <MyIcon width={24} height={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


export default BottomTabNavigator;
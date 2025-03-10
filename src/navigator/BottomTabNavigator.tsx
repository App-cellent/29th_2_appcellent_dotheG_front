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
import PedometerScreen from '../screens/Pedometer/PedometerScreen';
import ReportScreen from '../screens/Report/ReportScreen';
import MyScreen from '../screens/My/MyScreen';

import CharacterScreen from '../screens/Character/CharacterScreen';
import ListScreen from '../screens/Character/ListScreen';
// import DrawScreen from '../screens/Character/DrawScreen';
// import AnimalDrawScreen from '../screens/Character/AnimalDrawScreen';
// import DrawLoadingScreen from '../screens/Character/DrawLoadingScreen';
// import DrawResultScreen from '../screens/Character/DrawResultScreen';

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
        component={HomeScreen}
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
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Character', { screen: 'CharacterScreen' }); // CharacterScreen으로 이동
          },
        })}
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
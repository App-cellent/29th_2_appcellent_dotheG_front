/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import CharacterScreen from '../screens/Character/CharacterScreen';
import MyScreen from '../screens/My/MyScreen';
import PedometerScreen from '../screens/Pedometer/PedometerScreen';
import ReportScreen from '../screens/Report/ReportScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';
import HomeIcon from '../img/HomeIcon.svg';
import PedometerIcon from '../img/PedometerIcon.svg';
import CharacterIcon from '../img/CharacterIcon.svg';
import ReportIcon from '../img/ReportIcon.svg';
import MyIcon from '../img/MyIcon.svg';
import HomeActiveIcon from '../img/HomeActiveIcon.svg';
import PedometerActiveIcon from '../img/PedometerActiveIcon.svg';
import CharacterActiveIcon from '../img/CharacterActiveIcon.svg';
import ReportActiveIcon from '../img/ReportActiveIcon.svg';
import MyActiveIcon from '../img/MyActiveIcon.svg';

// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

function BottomTabNavigator(): React.JSX.Element {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: '#69E6A2',
          tabBarInactiveTintColor: '#D9D9D9',
          tabBarLabelStyle: {
            fontSize: 14,
            paddingVertical: 5,
            fontWeight: '700',
          },
          tabBarStyle: {
            height: 70,
            padding: 0,
            elevation: 0,
          },
      }}>
      <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            tabBarIcon: ({focused}) => (
                focused
                ? <HomeActiveIcon width={24} height={24} />
                : <HomeIcon width={24} height={24} />
            ),
          }}
        />
      <Tab.Screen
        name="Pedometer"
        component={PedometerScreen}
        options={{
          title: '만보기',
          tabBarIcon: ({focused}) => (
              focused
              ? <PedometerActiveIcon width={24} height={24} />
              : <PedometerIcon width={24} height={24} />
          ),
        }}
      />
      <Tab.Screen
          name="Character"
          component={CharacterScreen}
          options={{
            title: '캐릭터',
            tabBarIcon: ({focused}) => (
            focused
              ? <CharacterActiveIcon width={24} height={24} />
              : <CharacterIcon width={24} height={24} />
            ),
          }}
        />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
            title: '성과보고서',
            tabBarIcon: ({focused}) => (
            focused
              ? <ReportActiveIcon width={24} height={24} />
              : <ReportIcon width={24} height={24} />
            ),
        }}
        />
        <Tab.Screen
        name="My"
        component={MyScreen}
        options={{
            title: '마이페이지',
            tabBarIcon: ({focused}) => (
            focused
              ? <MyActiveIcon width={24} height={24} />
              : <MyIcon width={24} height={24} />
            ),
        }}
        />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

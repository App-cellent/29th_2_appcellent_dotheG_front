import React, { useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import BottomTabNavigator from './BottomTabNavigator';

import TodayQuizGuideScreen from '../screens/Home/TodayQuizGuideScreen';
import TodayQuizScreen from '../screens/Home/TodayQuizScreen';
import TodayQuizCorrectScreen from '../screens/Home/TodayQuizCorrectScreen';
import TodayQuizWrongScreen from '../screens/Home/TodayQuizWrongScreen';

import WithdrawalScreen from '../screens/My/WithdrawalScreen';
import AlarmScreen from '../screens/My/AlarmScreen';
import PasswordChangeScreen from '../screens/My/PasswordChangeScreen';
import CameraScreen from '../screens/Quest/CameraScreen';
import QuestConfirmationScreen from '../screens/Quest/QuestConfirmationScreen';

import ListScreen from '../screens/Character/ListScreen';
import DrawScreen from '../screens/Character/DrawScreen';
import AnimalDrawScreen from '../screens/Character/AnimalDrawScreen';
import LoadingScreen from '../screens/Character/LoadingScreen';
import ResultScreen from '../screens/Character/ResultScreen';

import WelcomeScreen from '../screens/User/WelcomeScreen';
import PwChangeCompleteScreen from '../screens/User/PwChangeCompleteScreen';

const StackNavigator = () => {
    const navigation = useNavigation();
    const Stack = createNativeStackNavigator();

    const goBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="TodayQuizGuideScreen"
                component={TodayQuizGuideScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="TodayQuizScreen"
                component={TodayQuizScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="TodayQuizCorrectScreen"
                component={TodayQuizCorrectScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="TodayQuizWrongScreen"
                component={TodayQuizWrongScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="WithdrawalScreen"
                component={WithdrawalScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="AlarmScreen"
                component={AlarmScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="PasswordChangeScreen"
                component={PasswordChangeScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CameraScreen"
                component={CameraScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="QuestConfirmationScreen"
                component={QuestConfirmationScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ListScreen"
                component={ListScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DrawScreen"
                component={DrawScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AnimalDrawScreen"
                component={AnimalDrawScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LoadingScreen"
                component={LoadingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ResultScreen"
                component={ResultScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PwChangeCompleteScreen"
                component={PwChangeCompleteScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    customHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    LeftArrow: {
        marginTop: 20,
        marginLeft: 2,
    },
});

export default StackNavigator;

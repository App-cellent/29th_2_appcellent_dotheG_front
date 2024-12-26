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
import DoTheG from '../img/Navigator/DoTheG.svg';
import AlarmIcon from '../img/Navigator/AlarmIcon.svg';
import LeftArrowIcon from '../img/Navigator/LeftArrowIcon.svg';

import TodayQuizGuideScreen from '../screens/Home/TodayQuizGuideScreen';

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
                options={{
                    header: () => (
                        <View style={styles.customHeader}>
                            <View style={styles.headerLeft}>
                                <DoTheG />
                            </View>
                            <View style={styles.headerRight}>
                                <TouchableOpacity>
                                    <AlarmIcon />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ),
                }}
            />

            <Stack.Screen
                name="TodayQuizGuideScreen"
                component={TodayQuizGuideScreen}
                options={{
                    header: () => (
                        <View style={styles.customHeader}>
                            <View style={styles.headerLeft}>
                            <TouchableOpacity onPress={goBack}>
                                <LeftArrowIcon style={styles.LeftArrow}/>
                            </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
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

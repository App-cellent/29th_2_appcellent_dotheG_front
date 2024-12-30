import React from "react";

import DoTheG from '../img/Navigator/DoTheG.svg';
import AlarmIcon from '../img/Navigator/AlarmIcon.svg';
import LeftArrowIcon from '../img/Navigator/LeftArrowIcon.svg';

import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const MainHeader: React.FC<GradientButtonProps> = () => {
    return (
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

export default MainHeader;
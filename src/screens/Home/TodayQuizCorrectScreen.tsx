import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';

import SeedIcon from '../../img/Home/SeedIcon.svg';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const { height } = Dimensions.get('window');

function TodayQuizCorrectScreen(): React.JSX.Element {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
           <ImageBackground source={require('../../img/Home/Quiz/QuizCorrectBackgroundImage.png')}
            style={styles.backgroundImage}>
                <View style={styles.rowItem}>
                    <Text style={styles.GreenText}>정답</Text>
                    <Text style={styles.BoldLargeText}>이에요:)</Text>
                </View>

                <Text style={styles.SmallText}>내일도 오늘의 퀴즈에 도전해보세요!</Text>
                <View style={[styles.rowItem, {marginTop: 14}]}>
                    <SeedIcon width={15} height={20} />
                    <Text style={styles.SmallBoldText}>20 획득!</Text>
                </View>

           </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: 354,
        height: 354,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    GreenText: {
        color: colors.green,
        fontSize: getFontSize(24),
        fontWeight: '800',
        lineHeight: 34,
    },
    BoldLargeText: {
        color: colors.black,
        fontSize: getFontSize(24),
        fontWeight: '800',
        lineHeight: 34,
    },
    SmallText: {
        color: colors.lightblack,
        fontSize: getFontSize(13),
        fontWeight: '400',
        lineHeight: 34,
    },
    SmallBoldText: {
        marginLeft: 5,
        color: colors.lightblack,
        fontSize: getFontSize(16),
        fontWeight: '800',
        lineHeight: 34,
    }
});

export default TodayQuizCorrectScreen;


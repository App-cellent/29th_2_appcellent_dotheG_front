import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';

import GradientButton from "../../components/GradientButton";

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

function TodayQuizWrongScreen(): React.JSX.Element {
    const titleText = '오답이에요. 친환경 인증 마크, 다시 확인해보세요!';
    const contentText = '친환경 인증 마크’는 친환경 제품에 대한 자발적 기업 생산 및 소비 활성화를 위한 환경표지인증 제도에요. 1992년부터 현재까지 진행되고 있는 사업이에요. 사무용 기기·가구 및 사무용품, 주택·건설용 자재·재료 및 설비, 개인용품 및 가정용품, 가정용 기기·가구 등 우리의 생활 곳곳에서 만나볼 수 있는 친근한 마크 중 하나입니다!'

    const navigation = useNavigation();

    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleNavigateQuizPress = useCallback(async () => {
        navigation.popToTop();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.TopTextContainer}>
                <View style={[styles.rowContainer, {marginBottom: 10}]}>
                    <Text style={styles.GreenText}>{formattedDate}</Text>
                    <Text style={[styles.GreenText, { color: colors.lightblack }]}> 오늘의 퀴즈</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.BoldLargeText}>{titleText}</Text>
                </View>
            </View>

            <View style={styles.imageContainer}>
                <Image source={require('../../img/Home/Quiz/quiz1.png')} style={styles.answerImage} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.ContentText}>{contentText}</Text>
            </View>

            <View style={styles.BtnContainer}>
                <GradientButton height={56} width={328} text="홈으로 돌아가기" onPress={handleNavigateQuizPress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    header: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 18,
    },
    closeIcon: {
        width: 7.13,
        height: 14,
    },
    TopTextContainer: {
        paddingHorizontal: 22,
        marginTop: 85,
    },
    imageContainer: {
        width: 266,
        height: 248,
        marginHorizontal: 47,
        marginVertical: 26,
        backgroundColor: '#EFF0F2',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        marginHorizontal: 47,
    },
    answerImage:{
        width: 170,
        height: 170,
    },
    rowContainer:{
        flexDirection: 'row',
    },
    GreenText: {
        color: colors.green,
        fontSize: getFontSize(16),
        fontWeight: '400',
    },
    BoldLargeText: {
        color: colors.black,
        fontSize: getFontSize(25),
        fontWeight: '800',
        lineHeight: 34,
        marginBottom: 8,
    },
    ContentText: {
        color: colors.lightblack,
        fontSize: getFontSize(14),
        fontWeight: '400',
        lineHeight: 25,
    },
    BtnContainer: {
        marginHorizontal: 16,
        alignItems: 'center',
        marginTop: 70,
    },
});

export default TodayQuizWrongScreen;

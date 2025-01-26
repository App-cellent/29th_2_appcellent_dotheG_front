import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';

import GradientButton from "../../components/GradientButton";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const { height } = Dimensions.get('window');

function TodayQuizWrongScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const route = useRoute();

    // Extract data passed from TodayQuiz1Screen
    const { hintText, imageUrl } = route.params;

    const titleText = '오답이에요. 다시 확인해보세요!';
    const contentText = hintText || '해설을 불러오는데 실패했습니다.';  // Fallback if no hintText is provided

    const handleNavigateQuizPress = useCallback(async () => {
        navigation.navigate("HomeScreen");
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.TopTextContainer}>
                <View style={[styles.rowContainer, { marginBottom: 10 }]}>
                    <Text style={styles.GreenText}>{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                    <Text style={[styles.GreenText, { color: colors.lightblack }]}> 오늘의 퀴즈</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.BoldLargeText}>{titleText}</Text>
                </View>
            </View>

            {imageUrl ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.answerImage} />
                </View>
            ) : null}

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
    TopTextContainer: {
        paddingHorizontal: 22,
        marginTop: 85,
        alignSelf: 'flex-start',
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
        marginHorizontal: 22,
        alignSelf: 'flex-start',
    },
    answerImage: {
        width: 170,
        height: 170,
    },
    rowContainer: {
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
        marginTop: 491,
    },
});

export default TodayQuizWrongScreen;

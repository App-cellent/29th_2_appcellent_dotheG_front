import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from "../../../utils/colors";
import { getFontSize } from '../../../utils/fontUtils';

import GradientButton from "../../../components/GradientButton";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

function TodayQuizWrongScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const route = useRoute();

    console.log(route.params);

    const { data } = route.params;
    const imageUrl = data.quizSolImage;
    const contentText = data.quizSol || '';  // Fallback if no hintText is provided

    const handleNavigateQuizPress = useCallback(async () => {
        navigation.navigate('Main', { screen: 'Home' });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.TopTextContainer}>
                <View style={[styles.rowContainer, { marginBottom: 10 }]}>
                    <Text style={styles.GreenText}>{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                    <Text style={[styles.GreenText, { color:  colors.lightblack }]}> 오늘의 퀴즈</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.BoldLargeText}>오답이에요. 다시 확인해보세요!</Text>
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
                <GradientButton height={56} width={358} text="홈으로 돌아가기" onPress={handleNavigateQuizPress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 22,
    },
    TopTextContainer: {
        marginTop: 85,
        alignSelf: 'flex-start',
    },
    imageContainer: {
        width: '100%',
        height: width - 44,
        backgroundColor: '#EFF0F2',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        width: '100%',
        alignSelf: 'flex-start',
    },
    answerImage: {
        width: '65%',
        height: width - 190,
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
        fontSize: getFontSize(15),
        fontWeight: '400',
        marginVertical: 26,
        lineHeight: 25,
    },
    BtnContainer: {
        marginHorizontal: 16,
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
    },
});

export default TodayQuizWrongScreen;

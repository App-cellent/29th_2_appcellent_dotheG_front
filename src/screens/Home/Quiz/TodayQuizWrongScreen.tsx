import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from "../../../utils/colors";
import { getFontSize } from '../../../utils/fontUtils';

import { LinearGradient } from 'react-native-linear-gradient';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
} from 'react-native';

const { width, height } = Dimensions.get('window');

function TodayQuizWrongScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const route = useRoute();

    const [backPressedOnce, setBackPressedOnce] = useState(false);

    const { data } = route.params;
    const imageUrl = data.quizSolImage;
    const contentText = data.quizSol || '';

    const handleNavigateQuizPress = useCallback(async () => {
        navigation.navigate('Main', { screen: 'Home' });
    }, [navigation]);

    const onBackPressEvent = useCallback(() => {
        if (backPressedOnce) {
            BackHandler.exitApp(); // 앱 종료
        } else {
            setBackPressedOnce(true);
            ToastAndroid.show("한 번 더 누르면 종료됩니다.", ToastAndroid.SHORT);

            setTimeout(() => {
                setBackPressedOnce(false);
            }, 2000); // 2초 안에 다시 누르면 종료
        }
        return true;
    }, [backPressedOnce]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPressEvent);

        return () => {
            backHandler.remove();
        };
    }, [onBackPressEvent]);

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

            <TouchableOpacity
                style={[styles.BtnContainer]}
                onPress={handleNavigateQuizPress}
            >
                <LinearGradient
                    colors={['#9BC9FE', '#69E6A2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.completeButton} // 여기서 스타일을 조정
                >
                    <Text style={styles.completeButtonText}>홈으로 돌아가기</Text>
                </LinearGradient>
            </TouchableOpacity>
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
        position: 'absolute',
        bottom: 50,
        left: 16,
        right: 16,
        height: 56, // 버튼 높이 고정
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    completeButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    completeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TodayQuizWrongScreen;

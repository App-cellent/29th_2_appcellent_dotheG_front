import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from "../../../utils/colors";
import { getFontSize } from '../../../utils/fontUtils';

import { LinearGradient } from 'react-native-linear-gradient';
import LeftArrow from '../../../img/Home/Quiz/LeftArrow.svg';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const { height } = Dimensions.get('window');

function TodayQuizGuideScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const [quizType, setQuizType] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    const [loading, setLoading] = useState(true);
    const [quizAvailable, setQuizAvailable] = useState(true);

    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('token');
                const response = await fetch(`${apiUrl}/quiz/getQuiz?timestamp=${new Date().getTime()}`, {
                    method: 'GET',
                    headers: {
                        "Cache-Control":'no-store',
                        "Content-Type":"application/json",
                        access: `${accessToken}`,
                    },
                });

                if (response.status === 404) {
                  setQuizAvailable(false);
                  console.log("404");
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    console.log(result.data);
                    setQuizType(result.data.quizType);
                    setQuizAvailable(true);
                 } else {
                    console.error(result.message);
                    setQuizAvailable(false);
                }
            } catch (error) {
                console.error('Error fetching today quiz data:', error);
                setQuizAvailable(false);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, []);

    const navigateToQuiz = () => {
        if (quizType === 1) {
            navigation.navigate('TodayQuiz1Screen');
        } else if (quizType === 2) {
            navigation.navigate('TodayQuiz2Screen');
        } else if (quizType === 3) {
            navigation.navigate('TodayQuiz3Screen');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <LeftArrow style={styles.closeIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.TopTextContainer}>
                <Text style={styles.GreenText}>{formattedDate}</Text>
                <Text style={styles.BoldLargeText}>오늘의 퀴즈 DO!</Text>
                <Text style={styles.BoldSmallText1}>매일매일 열리는 오늘의 퀴즈 풀고</Text>
                <Text style={styles.BoldSmallText1}>오늘만 받을 수 있는 리워드를 받아가세요.</Text>
            </View>

            <ImageBackground source={require('../../../img/Home/GradientBackground.png')} style={styles.gradient}>
                <Image source={require('../../../img/Home/GradientEarth.png')} style={styles.earthImage} />
            </ImageBackground>

            <View style={styles.Wrapper}>
                <View style={styles.BottomTextContainer}>
                    <Text style={styles.BoldSmallText2}>• 오늘의 퀴즈의 기회는 딱 한 번 뿐이에요.</Text>
                    <Text style={[styles.BoldSmallText2, {marginLeft: 7}]}>신중하게 풀어보세요!</Text>
                    <Text style={styles.BoldSmallText2}>• 오늘의 퀴즈 이벤트 리워드는 퀴즈를 풀고 나서</Text>
                    <Text style={[styles.BoldSmallText2, {marginLeft: 7}]}>확인해볼 수 있어요.</Text>
                </View>
            </View>

            <TouchableOpacity
                style={[styles.BtnContainer, { backgroundColor: quizAvailable ? 'transparent' : '#D3D3D3' }]}
                disabled={!quizAvailable}
                onPress={navigateToQuiz}
            >
                <LinearGradient
                    colors={['#9BC9FE', '#69E6A2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.completeButton} // 여기서 스타일을 조정
                >
                    <Text style={styles.completeButtonText}>퀴즈 풀기</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 18,
        height: 56,
    },
    closeIcon: {
        marginTop: 10,
        width: 11.13,
        height: 18,
    },
    TopTextContainer: {
        paddingHorizontal: 22,
        marginTop: 29,
    },
    BottomTextContainer: {},
    gradient: {
        height: 201,
        marginTop: 44,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    earthImage: {
        width: 184,
        height: 132,
    },
    GreenText: {
        color: colors.green,
        fontSize: getFontSize(16),
        fontWeight: '400',
        lineHeight: 34,
    },
    BoldLargeText: {
        color: colors.black,
        fontSize: getFontSize(25),
        fontWeight: '800',
        lineHeight: 34,
        marginBottom: 8,
    },
    BoldSmallText1: {
        color: colors.lightblack,
        fontSize: getFontSize(15),
        fontWeight: '400',
        lineHeight: 25,
    },
    BoldSmallText2: {
        color: colors.lightblack,
        fontSize: getFontSize(14),
        fontWeight: '400',
        lineHeight: 25,
    },
    Wrapper: {
        paddingHorizontal: 22,
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

export default TodayQuizGuideScreen;

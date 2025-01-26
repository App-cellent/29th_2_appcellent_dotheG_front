import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';

import GradientButton from "../../components/GradientButton";
import GradientBackground from "../../img/Home/GradientBackground.png";
import GradientEarth from "../../img/Home/GradientEarth.png";

import AsyncStorage from '@react-native-async-storage/async-storage';

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

                // 응답 상태
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    console.log(result.data);
                    setQuizType(result.data.quizType);
                    setQuizAvailable(true);
                }
                else {
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

    const handleNavigateQuizPress = useCallback(async () => {
        navigation.navigate('TodayQuizScreen');
    }, [navigation]);

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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={require('../../img/My/arrowleft.png')}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
            </View>

            <View style={styles.TopTextContainer}>
                <Text style={styles.GreenText}>{formattedDate}</Text>
                <Text style={styles.BoldLargeText}>오늘의 퀴즈 DO!</Text>

                <Text style={styles.BoldSmallText1}>매일매일 열리는 오늘의 퀴즈 풀고</Text>
                <Text style={styles.BoldSmallText1}>오늘만 받을 수 있는 리워드를 받아가세요.</Text>
            </View>

            <ImageBackground source={require('../../img/Home/GradientBackground.png')} style={styles.gradient}>
              <Image source={require('../../img/Home/GradientEarth.png')} style={styles.earthImage} />
            </ImageBackground>

            <View style={styles.BottomTextContainer}>
                <Text style={styles.BoldSmallText2}>• 오늘의 퀴즈의 기회는 딱 한 번 뿐이에요.</Text>
                <Text style={[styles.BoldSmallText2, {marginLeft: 7}]}>신중하게 풀어보세요!</Text>
                <Text style={styles.BoldSmallText2}>• 오늘의 퀴즈 이벤트 리워드는 퀴즈를 풀고 나서</Text>
                <Text style={[styles.BoldSmallText2, {marginLeft: 7}]}>확인해볼 수 있어요.</Text>
            </View>

            <View style={styles.BtnContainer}> /* 오늘 안 풀었으면 false -> 풀었으면 true, isDisabled */
                <GradientButton height={56} width={328} text="퀴즈 풀기" isDisabled={!quizAvailable} onPress={navigateToQuiz}/>
            </View>
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
        width: 7.13,
        height: 14,
    },
    TopTextContainer: {
        paddingHorizontal: 22,
        marginTop: 29,
    },
    BottomTextContainer: {
        paddingHorizontal: 21,
    },
    gradient: {
        height: 171,
        marginTop: 44,
        marginBottom: 15,
        justifyContent: 'center', // 수직 가운데 정렬
        alignItems: 'center', // 수평 가운데 정렬
    },
    earthImage: {
        width: 164,
        height: 112,
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
    BtnContainer: {
        paddingHorizontal: 16,
        alignItems: 'center',
        marginTop: 93,
    },
});

export default TodayQuizGuideScreen;


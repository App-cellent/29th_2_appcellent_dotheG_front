import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from "../../../utils/colors";
import { getFontSize } from '../../../utils/fontUtils';

import GradientButton from "../../../components/GradientButton";
import { LinearGradient } from 'react-native-linear-gradient';
import GradientBackground from "../../../img/Home/GradientBackground.png";
import GradientEarth from "../../../img/Home/GradientEarth.png";

import LeftArrow from '../../../img/Home/Quiz/LeftArrow.svg';
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

function TodayQuiz3Screen(): React.JSX.Element {
    const navigation = useNavigation();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [quizTitle, setQuizTitle] = useState("");
    const [quizText, setQuizText] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [responseMessage, setResponseMessage] = useState(""); // 서버에서 받은 메시지 상태 추가

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
                            "Cache-Control": 'no-store',
                            "Content-Type": "application/json",
                            access: `${accessToken}`,
                        },
                    });

                    // 응답 상태
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const result = await response.json();

                    if (result.success) {
                        console.log(result.data);
                        setQuizTitle(result.data.quizTitle);
                        setQuizText(result.data.quizText);
                    } else {
                        console.error(result.message);
                    }
                } catch (error) {
                    console.error('Error fetching today quiz data:', error);
                }
            };

            fetchQuizData();
        }, []);

        const handleSelectAnswer = (answer) => {
            setSelectedAnswer(answer);
            console.log(answer);
        };

        const handleNavigateQuizPress = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('token');
                const response = await fetch(`${apiUrl}/quiz/answer?myAnswer=${selectedAnswer}`, {
                    method: 'POST',
                    headers: {
                        "Cache-Control": 'no-store',
                        "Content-Type": "application/json",
                        access: `${accessToken}`,
                    },
                    body: JSON.stringify({
                        selectedAnswer,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    if (result.data === "정답입니다.") {
                        navigation.navigate("TodayQuizCorrectScreen");
                    } else {
                        setResponseMessage(result.data);
                        navigation.navigate("TodayQuizWrongScreen", {
                            data: result.data,
                        });
                    }
                } else {
                    console.error(result.message);
                    setResponseMessage(result.message);  // Handle failure messages
                }
            } catch (error) {
                console.error('Error submitting quiz answer:', error);
                setResponseMessage('퀴즈 제출에 실패했습니다.');
            }
        };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <LeftArrow
                        style={styles.closeIcon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.TopTextContainer}>
                <View style={[styles.rowContainer, {marginBottom: 10}]}>
                    <Text style={styles.GreenText}>{formattedDate}</Text>
                    <Text style={[styles.GreenText, { color: colors.lightblack }]}> 오늘의 퀴즈</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.questionMark}>Q. </Text>
                    <Text style={styles.BoldLargeText}>{quizTitle}</Text>
                </View>
            </View>

            <View style={styles.TwoAnswerContainer}>
              <TouchableOpacity
                onPress={() => handleSelectAnswer('O')}
              >
                  <View style={[styles.Answer, selectedAnswer === 'O' && styles.selected]}>
                    <Image source={require('../../../img/Home/Quiz/O.png')} style={[styles.Selected, {width: 63, height: 62}]} />
                    <Text style={styles.OText}>그렇다</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => handleSelectAnswer('X')}
                >
                <View style={[styles.Answer, selectedAnswer === 'X' && styles.selected]}>
                    <Image source={require('../../../img/Home/Quiz/X.png')} style={[styles.Selected, {width: 56, height: 63} ]} />
                    <Text style={styles.XText}>아니다</Text>
                </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[
                    styles.BtnContainer,
                    { backgroundColor: selectedAnswer === null ? '#D3D3D3' : 'transparent' }
                ]}
                disabled={selectedAnswer === null}
                onPress={handleNavigateQuizPress}
            >
                <LinearGradient
                    colors={selectedAnswer === null ? ['#D3D3D3', '#D3D3D3'] : ['#9BC9FE', '#69E6A2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.completeButton}
                >
                    <Text style={styles.completeButtonText}>제출하기</Text>
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
    TwoAnswerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    Answer: {
        width: 168,
        height: 158,
        marginHorizontal: 10,
        backgroundColor: '#EFF0F2',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        borderColor: colors.green,
        borderWidth: 4,
    },
    OText: {
        color: "#2088FF",
        fontSize: getFontSize(14),
        fontWeight: '800',
        marginTop: 8,
    },
    XText: {
        color: "#FF5F5F",
        marginTop: 8,
        fontSize: getFontSize(14),
        fontWeight: '800',
    },
    rowContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        alignItems: 'flex-start',
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
        flex: 1,
        flexShrink: 1,
    },
    questionMark: {
        fontSize: getFontSize(25),
        fontWeight: '800',
        color: colors.green,
        lineHeight: 34,
    },
    BtnContainer: {
        position: 'absolute',
        bottom: 50,
        left: 16,
        right: 16,
        height: 56,
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
    Selected:{
        color: colors.lightblack,
        fontSize: getFontSize(100),
        fontWeight: '700',
    }
});

export default TodayQuiz3Screen;


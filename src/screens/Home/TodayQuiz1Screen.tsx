import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';

import GradientButton from "../../components/GradientButton";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { height } = Dimensions.get('window');

function TodayQuiz1Screen(): React.JSX.Element {
    const navigation = useNavigation();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [quizTitle, setQuizTitle] = useState("");
    const [quizText, setQuizText] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [responseMessage, setResponseMessage] = useState(""); // 서버에서 받은 메시지 상태

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

                // 응답 상태
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
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

    const handleUserAnswer = (answer: string) => {
        setUserAnswer(answer);
    };

    const handleNavigateQuizPress = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('token');
            const response = await fetch(`${apiUrl}/quiz/answer?myAnswer=${userAnswer}`, {
                method: 'POST',
                headers: {
                    "Cache-Control": 'no-store',
                    "Content-Type": "application/json",
                    access: `${accessToken}`,
                },
                body: JSON.stringify({
                    selectedAnswer: userAnswer,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                if (result.data === "정답입니다") {
                    setResponseMessage("정답입니다!");
                    navigation.navigate("TodayQuizCorrectScreen");
                } else {
                    setResponseMessage(result.data);
                    navigation.navigate("TodayQuizWrongScreen", {
                        hintText: result.data,
                        imageUrl: result.data.imageUrl || null,
                    });
                }
            } else {
                console.error(result.message);
                setResponseMessage(result.message);  // 실패 메시지도 처리
            }
        } catch (error) {
            console.error('Error submitting quiz answer:', error);
            setResponseMessage('퀴즈 제출에 실패했습니다.');
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
                <View style={[styles.rowContainer, { marginBottom: 10 }]}>
                    <Text style={styles.GreenText}>{formattedDate}</Text>
                    <Text style={[styles.GreenText, { color: colors.lightblack }]}> 오늘의 퀴즈</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.BoldLargeText}>Q. {quizTitle}</Text>
                </View>
            </View>

            {/* 주관식 입력 필드 (한 줄) */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="여기에 답을 입력하세요"
                    value={userAnswer}
                    onChangeText={handleUserAnswer}
                    multiline={false} // 한 줄로 설정
                />
            </View>

            {quizText && (
                <View style={styles.hintContainer}>
                    <Text style={styles.hintText}>{quizText}</Text>
                </View>
            )}

            {responseMessage && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>{responseMessage}</Text>
                </View>
            )}

            <View style={styles.BtnContainer}>
                <GradientButton
                    height={56}
                    width={328}
                    text="제출하기"
                    onPress={handleNavigateQuizPress}
                    isDisabled={userAnswer === ""}
                />
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
    inputContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    textInput: {
        height: 50,  // 한 줄 크기
        borderColor: '#EFF0F2',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: getFontSize(16),
    },
    hintContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    hintText: {
        fontSize: getFontSize(14),
        color: colors.lightblack,
    },
    resultContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    resultText: {
        fontSize: getFontSize(16),
        fontWeight: '500',
        color: colors.black,
    },
    BtnContainer: {
        marginHorizontal: 16,
        alignItems: 'center',
        marginTop: 191,
    },
});

export default TodayQuiz1Screen;

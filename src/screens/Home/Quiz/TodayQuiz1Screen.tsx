import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from "../../../utils/colors";
import { getFontSize } from '../../../utils/fontUtils';

import GradientButton from "../../../components/GradientButton";
import LeftArrow from '../../../img/Home/Quiz/LeftArrow.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

const { height } = Dimensions.get('window');

function TodayQuiz1Screen(): React.JSX.Element {
    const navigation = useNavigation();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [quizTitle, setQuizTitle] = useState("");
    const [quizText, setQuizText] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

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
                setResponseMessage(result.message);
            }
        } catch (error) {
            console.error('Error submitting quiz answer:', error);
            setResponseMessage('퀴즈 제출에 실패했습니다.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingContainer}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.scrollContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <Image
                                source={require('../../../img/My/arrowleft.png')}
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
                            <Text style={styles.questionMark}>Q. </Text>
                            <Text style={styles.BoldLargeText}>정답을 입력해주세요.</Text>
                        </View>
                    </View>

                    <View style={styles.quizTextContainer}>
                        <View style={styles.QuizTitleContainer}>
                            <Text style={styles.QuizTitle}>{quizTitle}</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="정답은?"
                                value={userAnswer}
                                onChangeText={handleUserAnswer}
                                multiline={false}
                            />
                        </View>
                    </View>

                    <View style={styles.hintContainer}>
                        <Image
                            source={require('../../../img/Home/Quiz/Hint.png')}
                            style={[styles.Selected, { width: 15.27, height: 21 }]}
                        />
                        <Text style={styles.HintGreenText}>Hint! </Text>
                        <Text style={styles.HintGreyText}>: 초성 힌트를 드릴게요. "{quizText}" </Text>
                    </View>
                </View>
                <View style={styles.BtnContainer}>
                    <GradientButton
                        height={56}
                        width={328}
                        text="제출하기"
                        onPress={handleNavigateQuizPress}
                        isDisabled={userAnswer === ""}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    keyboardAvoidingContainer: {
        flex: 1,
    },
    scrollContent: {
        flex: 1,
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
    quizTextContainer: {
        backgroundColor: '#F3F4F6',
        width: '90%',
        height: 209,
        borderRadius: 10,
        marginHorizontal: '5%',
        marginVertical: 16,
        paddingHorizontal: 27,
        paddingVertical: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    QuizTitleContainer: {
        width: '100%',
        alignItems: 'center',
    },
    QuizTitle: {
        color: colors.black,
        fontSize: getFontSize(15),
        fontWeight: '800',
        lineHeight: 25,
        textAlign: 'center',
        flexShrink: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    GreenText: {
        fontSize: getFontSize(16),
        fontWeight: '400',
        color: colors.green,
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
    inputContainer: {
        width: '100%',
        marginTop: 20,
        marginHorizontal: 20,
    },
    textInput: {
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: getFontSize(16),
    },
    hintContainer: {
        width: '80%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    HintGreenText: {
        fontSize: getFontSize(14),
        color: '#69E6A2',
        marginLeft: 7,
    },
    HintGreyText: {
        fontSize: getFontSize(14),
        color: '#A7A7A7',
    },
    BtnContainer: {
        alignSelf: 'center',
        marginBottom: 43,
    },
});

export default TodayQuiz1Screen;

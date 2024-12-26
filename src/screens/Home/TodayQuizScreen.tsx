import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';

import GradientButton from "../../components/GradientButton";

import GradientBackground from "../../img/Home/GradientBackground.png";
import GradientEarth from "../../img/Home/GradientEarth.png";

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

function TodayQuizScreen(): React.JSX.Element {
    const navigation = useNavigation();

    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleNavigateQuizPress = useCallback(async () => {
        navigation.navigate('TodayQuizScreen');
    }, [navigation]);

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleSelectAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    useEffect(() => {
        if (selectedAnswer !== null) {
            console.log("선택된 답:", selectedAnswer);
        }
    }, [selectedAnswer]);

    return (
        <View style={styles.container}>
            <View style={styles.TopTextContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.GreenText}>{formattedDate}</Text>
                    <Text style={[styles.GreenText, { color: colors.lightblack }]}> 오늘의 퀴즈</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.BoldLargeText}>Q. 다음 중 친환경 인증 마크에 해당하는 것은?</Text>
                </View>
            </View>

            <View style={styles.TwoAnswerContainer}>
              <TouchableOpacity
                style={[selectedAnswer === 'quiz1' && styles.selected]}
                onPress={() => handleSelectAnswer('quiz1')}
              >
                  <View style={styles.Answer}>
                    <Image source={require('../../img/Home/Quiz/quiz1.png')} />
                  </View>
              </TouchableOpacity>
              <TouchableOpacity
                  style={[selectedAnswer === 'quiz2' && styles.selected]}
                  onPress={() => handleSelectAnswer('quiz2')}
                >
                <View style={styles.Answer}>
                <Image source={require('../../img/Home/Quiz/quiz2.png')} />
                </View>
                </TouchableOpacity>
            </View>

            <View style={styles.TwoAnswerContainer}>
            <TouchableOpacity
                style={[selectedAnswer === 'quiz3' && styles.selected]}
                onPress={() => handleSelectAnswer('quiz3')}
              >
              <View style={styles.Answer}>
                <Image source={require('../../img/Home/Quiz/quiz3.png')} />
              </View>
              </TouchableOpacity>
              <TouchableOpacity
                  style={[selectedAnswer === 'quiz4' && styles.selected]}
                  onPress={() => handleSelectAnswer('quiz4')}
                >
              <View style={styles.Answer}>
                <Image source={require('../../img/Home/Quiz/quiz4.png')} />
              </View>
              </TouchableOpacity>
            </View>

            <View style={styles.BtnContainer}>
                <GradientButton height={56} width={328} text="제출하기" onPress={handleNavigateQuizPress} isDisabled={selectedAnswer === null}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 36,
    },
    TopTextContainer: {
        paddingHorizontal: 22,
    },
    TwoAnswerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    Answer: {
        width: 168,
        height: 158,
        margin: 10,
        backgroundColor: '#EFF0F2',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        borderColor: colors.green,
        borderWidth: 4,
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
    BtnContainer: {
        marginHorizontal: 16,
        alignItems: 'center',
        marginTop: 191,
    },
});

export default TodayQuizScreen;


import React, { useState, useEffect } from 'react';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';

import MainHeader from '../../components/MainHeader';
import LinearGradientBackground from 'react-native-linear-gradient';
import {Animated} from 'react-native';

import Svg, { Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
} from 'react-native';

function PedometerScreen(): React.JSX.Element {
    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const [goalYN, setGoalYN] = useState(false);

    const [todayStep, setTodayStep] = useState(10000);
    const [monthStep, setMonthStep] = useState(100398);
    const [accumulateStep, setAccumulateStep] = useState(1000034);
    const carbonEmissions = 5.4;
    const targetStep = 7000;

    useEffect(() => {
        setMonthStep(monthStep.toLocaleString('ko-KR'));
        setAccumulateStep(accumulateStep.toLocaleString('ko-KR'));

        if(todayStep >= targetStep) setGoalYN(true);
    }, []);

    const [opacityAnimation] = useState(new Animated.Value(1));

      useEffect(() => {
        const interval = setInterval(() => {
          Animated.sequence([
            Animated.timing(opacityAnimation, {
              toValue: 0.5,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnimation, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]).start();
        }, 5000);

        return () => clearInterval(interval);  // 컴포넌트 언마운트 시 interval 정리
      }, [opacityAnimation]);

    return (
        <View style={styles.container}>
            <MainHeader />
            <View style={styles.topContainer}>
                <Text style={styles.GreenText}>{formattedDate}</Text>
                <Svg height="25" width="215">
                    <Defs>
                        <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <Stop offset="0%" stopColor="#69E6A2" stopOpacity="1" />
                            <Stop offset="100%" stopColor="#9BC9FE" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <SvgText
                        fill="url(#grad1)"
                        fontSize={getFontSize(18)}
                        fontWeight="800"
                        x="0"
                        y="20"
                    >오늘의 목표를 달성해보세요!</SvgText>
                </Svg>

                <Text style={[styles.SmallText, {marginTop: 15}]}>오늘 걸음수</Text>
                <Text style={styles.BoldLargeText}>{todayStep}</Text>

                <View style={styles.walkingContainer}>
                    <View style={styles.walkingIconContainer}>
                        <Image source={require('../../img/Pedometer/RunningGradient.png')} style={[styles.runningIcon, {width: 16.02, height: 14}]}/>
                        <Image source={require('../../img/Pedometer/RunningGray.png')} style={[styles.runningIcon, {width: 19.02, height: 14}]}/>
                    </View>

                    <View style={styles.walkingProcessorContainer}>
                        <View style={styles.processorBar}>
                            <LinearGradientBackground
                                colors={['rgb(155, 201, 254)', 'rgb(105, 230, 162)']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[styles.progressBar, {
                                    width: `${Math.min((todayStep / targetStep) * 100, 100)}%`,
                                    borderRadius: 10, // 모서리 둥글게 설정
                                }]}
                            />
                        </View>
                    </View>

                    <View style={styles.walkingNumberContainer}>
                        <Text style={styles.GreenText}>0</Text>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={styles.GrayText}>목표 걸음 </Text>
                            <Text style={styles.GrayText}>{targetStep}</Text>
                            <Text style={styles.GrayText}>보</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                {!goalYN &&
                    <View style={styles.MenuBox}>
                        <Image source={require('../../img/Pedometer/CircleGreen.png')} style={styles.Icon} />
                        <View style={styles.stepContainer}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.stepText}>{monthStep}</Text>
                                <Text style={styles.stepText}>걸음</Text>
                            </View>
                            <Text style={styles.SmallGrayText}>주간 걸음 수</Text>
                        </View>
                    </View>
                }

                {goalYN &&
                    <Animated.View style={[styles.gradientContainer, { opacity: opacityAnimation }]}>
                    <LinearGradientBackground
                        colors={['rgb(155, 201, 254)', 'rgb(105, 230, 162)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{borderRadius: 15}}
                    >
                    <View style={styles.GoalMenuBox}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={require('../../img/Pedometer/CircleWhite.png')} style={styles.Icon} />
                            <View style={styles.stepContainer}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.stepText}>{monthStep}</Text>
                                    <Text style={styles.stepText}>걸음</Text>
                                </View>
                                <Text style={styles.SmallWhiteText}>주간 목표 걸음 수 달성!</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.GoalButton}>
                            <Text style={styles.GoalButtonText}>클릭!</Text>
                        </TouchableOpacity>
                    </View>
                    </LinearGradientBackground>
                    </Animated.View>
                }

                <View style={styles.MenuBox}>
                    <Image source={require('../../img/Pedometer/CircleGreen.png')} style={styles.Icon} />
                    <View style={styles.stepContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.stepText}>{accumulateStep}</Text>
                            <Text style={styles.stepText}>걸음</Text>
                        </View>
                        <Text style={styles.SmallGrayText}>누적 걸음 수</Text>
                    </View>
                </View>

                <View style={[styles.MenuBox, { height: 207, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }]}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.BoldSmallText}>걸어서 약 </Text>
                        <Text style={[styles.BoldSmallText, {color: colors.green}]}>{carbonEmissions}</Text>
                        <Text style={[styles.BoldSmallText, {color: colors.green}]}>kg</Text>
                        <Text style={styles.BoldSmallText}>의</Text>
                    </View>
                    <Text style={styles.BoldSmallText}>탄소 배출량을 줄였어요!</Text>
                    <Text style={[styles.SmallGrayText, {lineHeight: 25}]}>버스의 33km 이동 탄소 배출량을 기준으로 환산했어요.</Text>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require('../../img/Home/GradientEarth.png')} style={[styles.earthIcon]}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    topContainer:{
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer:{
        flex: 3,
        backgroundColor: colors.lightgray,
        paddingHorizontal: 16,
        justifyContent: 'space-evenly', //space-between
    },
    GreenText: {
        color: colors.green,
        fontSize: getFontSize(13),
        fontWeight: '400',
        lineHeight: 34,
    },
    walkingContainer:{
        width: '100%',
        paddingHorizontal: 23,
        alignItems: 'center',
    },
    walkingProcessorContainer: {
        marginHorizontal: 6,
        marginTop: 5,
        width: '100%',
        height: 13,
        borderRadius: 10,
        backgroundColor: colors.lightgray,
    },
    processorBar: {
        flex: 1,
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 10,
    },
    walkingIconContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    walkingNumberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    GrayText: {
        color: colors.gray,
        fontSize: getFontSize(13),
        fontWeight: '400',
        lineHeight: 34,
    },
    BoldLargeText: {
        color: colors.black,
        fontSize: getFontSize(25),
        fontWeight: '800',
        lineHeight: 34,
    },
    SmallText: {
        color: colors.lightblack,
        fontSize: getFontSize(13),
        fontWeight: '400',
        lineHeight: 34,
    },
    MenuBox: {
        backgroundColor: colors.white,
        width: '100%',
        height: 91,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 26,
    },
    GoalMenuBox: {
        width: '100%',
        height: 91,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 26,
        justifyContent: 'space-between'
    },
    Icon:{
        height: 36,
        width: 36,
        marginRight: 14,
    },
    stepContainer:{
        flexDirection: 'column',
    },
    stepText:{
        color: colors.lightblack,
        fontSize: getFontSize(15),
        fontWeight: '800',
        lineHeight: 20,
    },
    earthIcon:{
        height: 67,
        width: 98,
        marginTop: 14,
    },
    SmallGrayText: {
        color: colors.gray,
        fontSize: getFontSize(11),
        fontWeight: '400',
    },
    SmallWhiteText:{
        color: colors.white,
        fontSize: getFontSize(11),
        fontWeight: '400',
    },
    BoldSmallText: {
        color: colors.black,
        fontSize: getFontSize(18),
        fontWeight: '800',
        lineHeight: 25,
    },
    GoalButton:{
        width: 51,
        height: 28,
        borderRadius: 15,
        backgroundColor: colors.white,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    GoalButtonText:{
        color: colors.black,
        fontSize: getFontSize(12),
        fontWeight: '800',
        lineHeight: 28,
        textAlign: 'center',
    },
})

export default PedometerScreen;
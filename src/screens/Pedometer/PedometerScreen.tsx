import * as React from 'react'
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';

import MainHeader from '../../components/MainHeader';
import Svg, { Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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

    return (
        <View style={styles.container}>
            <MainHeader />
            <View style={styles.topContainer}>
                <Text style={styles.GreenText}>{formattedDate}</Text>
                <Svg height="25" width="208">
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
                <Text style={styles.BoldLargeText}>2048</Text>

                <View style={styles.walkingContainer}>
                    <View style={styles.walkingIconContainer}>
                        <Image source={require('../../img/Pedometer/RunningGradient.png')} style={[styles.runningIcon, {width: 16.02, height: 14}]}/>
                        <Image source={require('../../img/Pedometer/RunningGray.png')} style={[styles.runningIcon, {width: 19.02, height: 14}]}/>
                    </View>

                    <View style={styles.walkingProcessorContainer}>

                    </View>

                    <View style={styles.walkingNumberContainer}>
                        <Text style={styles.GreenText}>0</Text>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={styles.GrayText}>목표 걸음 </Text>
                            <Text style={styles.GrayText}>7000</Text>
                            <Text style={styles.GrayText}>보</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.MenuBox}>
                    <Image source={require('../../img/Pedometer/CircleGreen.png')} style={styles.Icon} />
                    <View style={styles.stepContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.stepText}>50152</Text>
                            <Text style={styles.stepText}>걸음</Text>
                        </View>
                        <Text style={styles.SmallGrayText}>주간 걸음 수</Text>
                    </View>

                </View>

                <View style={styles.MenuBox}>
                    <Image source={require('../../img/Pedometer/CircleGreen.png')} style={styles.Icon} />
                    <View style={styles.stepContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.stepText}>50152</Text>
                            <Text style={styles.stepText}>걸음</Text>
                        </View>
                        <Text style={styles.SmallGrayText}>누적 걸음 수</Text>
                    </View>
                </View>

                <View style={[styles.MenuBox, { height: 207, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }]}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.BoldSmallText}>걸어서 약 </Text>
                        <Text style={[styles.BoldSmallText, {color: colors.green}]}>5.5</Text>
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
        alignItems: 'flex-start',
    },
    walkingIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    walkingProcessorContainer: {
        paddingHorizontal: 6,
        marginTop: 5,
        width: '100%',
        height: 13,
        borderRadius: 10,
        backgroundColor: colors.lightgray,
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
        height: 81,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 26,
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
        height: 58.65,
        width: 93.67,
        marginTop: 14,
    },
    SmallGrayText: {
        color: colors.gray,
        fontSize: getFontSize(11),
        fontWeight: '400',
    },
    BoldSmallText: {
        color: colors.black,
        fontSize: getFontSize(18),
        fontWeight: '800',
        lineHeight: 25,
    },
})

export default PedometerScreen;
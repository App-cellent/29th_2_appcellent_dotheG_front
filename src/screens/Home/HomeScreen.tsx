import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';
import LinearGradient from 'react-native-linear-gradient';

import RightArrowIcon from '../../img/Home/RightArrowIcon.svg';
import SeedIcon from '../../img/Home/SeedIcon.svg';
import HomeMainIcon from '../../img/Home/HomeMainIcon.svg';
import CircleThisMonthTreeIcon from '../../img/Home/CircleThisMonthTreeIcon.svg';
import CircleUserTreeIcon from '../../img/Home/CircleUserTreeIcon.svg';
import CircleStarIcon from '../../img/Home/CircleStarIcon.svg';
import CircleQuestionIcon from '../../img/Home/CircleQuestionIcon.svg';
import QuestIcon from '../../img/Home/QuestIcon.svg';
import PedometerIcon from '../../img/Home/PedometerIcon.svg';

import FloatingButton from '../../img/Home/FloatingButton.svg';

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

function HomeScreen(): React.JSX.Element {
    const navigation = useNavigation();

    const seed = '361';
    const username = '앱설런트';
    const thismonthtree = '5';
    const usertree = '21';

    const handleNavigateTodayQuiz = useCallback(async () => {
        navigation.navigate('TodayQuizGuideScreen');
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* 배경 이미지가 포함된 부분 */}
                <ImageBackground
                    style={styles.backgroundImage}
                    source={require("../../img/Home/HomeBackground.png")}
                    resizeMode="cover"
                >
                <View style={styles.HomeMainContainer}>
                    <View style={styles.SeedsContainer}>
                        <SeedIcon width={15} height={20} />
                        <Text style={styles.SeedsText}>{seed}</Text>
                    </View>
                    <View style={styles.HomeTextContainer}>
                        <View style={styles.MainTextContainer}>
                            <Text style={styles.TitleText1}>반가워요, </Text>
                            <Text style={styles.YellowText}>{username}</Text>
                            <Text style={styles.TitleText1}> 님!</Text>
                        </View>
                        <Text style={styles.TitleText2}>오늘도 우리 함께 달려보아요:)</Text>
                    </View>
                    <HomeMainIcon width="100%" height="50%" />

                    <TouchableOpacity onPress={handleNavigateTodayQuiz}>
                    <View style={styles.QuizBox}>
                        <Text style={styles.BoldLargeText}>오늘의 퀴즈 풀기</Text>
                        <RightArrowIcon width={8} height={14} />
                    </View>
                    </TouchableOpacity>
                </View>
                </ImageBackground>

                <View style={[styles.CenteredCountContainer, {height: 153}]}>
                    <View style={styles.TreeBox}>
                        <CircleThisMonthTreeIcon width={36} height={36} />
                        <View style={styles.TreeDetailBox}>
                            <Text style={styles.BoldSmallText}>{thismonthtree}그루</Text>
                            <Text style={styles.GrayText}>이번 달 지킨 나무</Text>
                        </View>
                    </View>
                    <View style={styles.TreeBox}>
                        <CircleUserTreeIcon width={36} height={36} />
                        <View style={styles.TreeDetailBox}>
                            <Text style={styles.BoldSmallText}>{usertree}그루</Text>
                            <Text style={styles.GrayText}>지금까지 지킨 나무</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.HomeMenuContainer}>
                    <View style={styles.HorizontalMenuBox}>
                        <View style={[styles.MenuBoxHalf, { marginRight: 8 }]}>
                            <View style={styles.HalfTitleContainer}>
                                <CircleQuestionIcon width={21} />
                                <Text style={[styles.BoldSmallText, {marginLeft: 7}]}>데일리 퀘스트</Text>
                            </View>
                            <Text style={styles.MediumText}>오늘의 만보기</Text>
                            <Text style={styles.MediumText}>7000보 달성하기</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
                                <PedometerIcon width={39} />
                            </View>
                        </View>


                        <View style={[styles.MenuBoxHalf, { marginLeft: 8 }]}>
                            <View style={styles.HalfTitleContainer}>
                                <CircleStarIcon width={21} />
                                <Text style={[styles.BoldSmallText, {marginLeft: 7}]}>스페셜 퀘스트</Text>
                            </View>
                            <Text style={styles.MediumText}>우리 집 근처</Text>
                            <Text style={styles.MediumText}>친환경샵 1번 방문하기</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
                                <QuestIcon width={56} />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MenuBox, {paddingLeft: 30}]}>
                        <Text style={styles.BoldLargeText}>오늘의 인증</Text>
                        <Text style={styles.GrayText}>나의 친환경 활동을 인증해보세요!</Text>
                    </View>

                    <View style={[styles.MenuBox, {paddingLeft: 30}]}>
                        <Text style={styles.BoldLargeText}>친환경 활동 가이드</Text>
                        <Text style={styles.GrayText}>오늘의 친환경 활동을 실천해보세요!</Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.floatingBtn}>
                <FloatingButton width={41} height={41}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        height: height * 0.6,
    },
    HomeMainContainer: {
    },
    scrollContainer: {
        backgroundColor: colors.lightgray,
    },
    SeedsContainer: {
        paddingHorizontal: 16,
        marginTop: 12,
        flexDirection: 'row',
    },
    SeedsText: {
        color: colors.white,
        marginLeft: 8,
        fontSize: getFontSize(16),
        fontWeight: '800',
    },
    HomeTextContainer: {
        marginTop: 19,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    QuizBox: {
        marginHorizontal: 16,
        marginTop: 12,
        backgroundColor: colors.white,
        height: 48,
        borderRadius: 15,
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 18,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    CenteredCountContainer: {
        backgroundColor: colors.white,
        borderRadius: 15,
        justifyContent: 'center',
        marginHorizontal: 16,
        justifyContent: 'space-evenly',
        bottom: 67,
    },
    MainTextContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    TitleText1: {
        color: colors.white,
        fontSize: getFontSize(23),
        fontWeight: '400',
        textShadowColor: '#41ABD4',
        textShadowRadius: 10,
    },
    TitleText2: {
        color: colors.white,
        fontSize: getFontSize(23),
        fontWeight: '800',
        textShadowColor: '#41ABD4',
        textShadowRadius: 10,
    },
    YellowText: {
        color: colors.yellow,
        fontSize: getFontSize(23),
        fontWeight: '800',
        textShadowColor: '#41ABD4',
        textShadowRadius: 10,
    },
    BoldLargeText: {
        color: colors.lightblack,
        fontSize: getFontSize(16),
        fontWeight: '800',
    },
    BoldSmallText: {
        color: colors.lightblack,
        fontSize: getFontSize(15),
        fontWeight: '800',
    },
    GrayText: {
        color: colors.gray,
        fontSize: getFontSize(11),
        fontWeight: '400',
        lineHeight: 20,
    },
    HomeMenuContainer: {
        bottom: 45,
        paddingHorizontal: 16,
        gap: 21,
    },
    HorizontalMenuBox: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    TreeBox: {
        flexDirection: 'row',
        paddingHorizontal: 26,
    },
    TreeDetailBox: {
        flexDirection: 'column',
        paddingLeft: 14,
    },
    MenuBox: {
        backgroundColor: colors.white,
        width: '100%',
        height: 81,
        borderRadius: 15,
        justifyContent: 'center',
        paddingLeft: 24,
    },
    MenuBoxHalf: {
        backgroundColor: colors.white,
        width: '48%',
        height: 152,
        borderRadius: 15,
        padding: 20,
    },
    HalfTitleContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    MediumText: {
        color: colors.lightblack,
        lineHeight: 20,
        fontSize: getFontSize(12),
        fontWeight: '400',
    },
    floatingBtn:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 41,
        height: 41,
    },
});

export default HomeScreen;

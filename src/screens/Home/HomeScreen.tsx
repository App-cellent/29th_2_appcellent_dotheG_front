import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';
import LinearGradient from 'react-native-linear-gradient';
import MainHeader from '../../components/MainHeader';

import RightArrowIcon from '../../img/Home/RightArrowIcon.svg';
import SeedIcon from '../../img/Home/SeedIcon.svg';
import CircleThisMonthTreeIcon from '../../img/Home/CircleThisMonthTreeIcon.svg';
import CircleUserTreeIcon from '../../img/Home/CircleUserTreeIcon.svg';
import CircleStarIcon from '../../img/Home/CircleStarIcon.svg';
import CircleQuestionIcon from '../../img/Home/CircleQuestionIcon.svg';
import QuestIcon from '../../img/Home/QuestIcon.svg';
import PedometerIcon from '../../img/Home/PedometerIcon.svg';
import FloatingButton from '../../img/Home/FloatingButton.svg';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  Pressable
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const { height } = Dimensions.get('window');

function HomeScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [showTreeInfo, setShowTreeInfo] = useState(true);
    const [loading, setLoading] = useState(false);

    // User state
    const [userName, setUserName] = useState('');
    const [userReward, setUserReward] = useState(0);
    const [mainChar, setMainChar] = useState(null);
    const [monthSavedTree, setMonthSavedTree] = useState(0.0);
    const [totalSavedTree, setTotalSavedTree] = useState(0.0);
    const [dailyActivity, setDailyActivity] = useState(1);
    const [specialActivity, setSpecialActivity] = useState(11);

    // Quiz state
    const [quizYN, setQuizYN] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    // Quest state
    const [dailyQuest, setDailyQuest] = useState(null);
    const [specialQuest, setSpecialQuest] = useState(null);

    const dailyQuests = [
        '텀블러 사용하기',
        '자전거 이용하기',
        '쓰레기 분리배출하기',
        '에코백 사용하기',
        '잔반 남기지 않기',
        '오늘의 만보기 \n7000보 달성하기'
    ];

    const specialQuests = [
        '플로깅/줍깅',
        '친환경 브랜드 이용하기',
        '제로 웨이스트 샵 방문하기',
        '반려 식물 키우기'
    ];

    const charImages = {
        1: require('../../img/Character/Image/1.png'),
        2: require('../../img/Character/Image/2.png'),
        3: require('../../img/Character/Image/3.png'),
        4: require('../../img/Character/Image/4.png'),
        5: require('../../img/Character/Image/5.png'),
        6: require('../../img/Character/Image/6.png'),
        7: require('../../img/Character/Image/7.png'),
        8: require('../../img/Character/Image/8.png'),
        9: require('../../img/Character/Image/9.png'),
        10: require('../../img/Character/Image/10.png'),
        11: require('../../img/Character/Image/11.png'),
        12: require('../../img/Character/Image/12.png'),
        13: require('../../img/Character/Image/13.png'),
        14: require('../../img/Character/Image/14.png'),
        15: require('../../img/Character/Image/15.png'),
        16: require('../../img/Character/Image/16.png'),
        17: require('../../img/Character/Image/17.png'),
        18: require('../../img/Character/Image/18.png'),
        19: require('../../img/Character/Image/19.png'),
    };

    const getDailyQuest = useCallback((activity: number) => {
        return dailyQuests[activity - 1];
    }, []);

    const getSpecialQuest = useCallback((activity: number) => {
        return specialQuests[activity - 11];
    }, []);

    const getMainCharImage = useCallback(() => {
        return charImages[mainChar];
    }, [mainChar]);

    const TreeInfo = useCallback(() => {
        setShowTreeInfo(prev => !prev);
    }, []);

    const fetchHomeData = useCallback(async () => {
        try {
            setLoading(true);
            const accessToken = await AsyncStorage.getItem('token');
            const response = await fetch(`${apiUrl}/mainpage/getInfo?timestamp=${new Date().getTime()}`, {
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
                const {
                    userName,
                    userReward,
                    mainChar,
                    monthSavedTree,
                    totalSavedTree,
                    dailyActivity,
                    specialActivity
                } = result.data;

                setUserName(userName);
                setUserReward(userReward);
                setMainChar(mainChar);
                setMonthSavedTree(monthSavedTree);
                setTotalSavedTree(totalSavedTree);
                setDailyQuest(getDailyQuest(dailyActivity));
                setSpecialQuest(getSpecialQuest(specialActivity));
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error fetching Home User data:', error);
        } finally {
            setLoading(false);
        }
    }, [getDailyQuest, getSpecialQuest]);

    const fetchQuizYNData = useCallback(async () => {
        try {
            const accessToken = await AsyncStorage.getItem('token');
            const response = await fetch(`${apiUrl}/quiz?timestamp=${new Date().getTime()}`, {
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
                setQuizYN(result.data);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error fetching quizYN:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchHomeData();
            fetchQuizYNData();
        }, [fetchHomeData, fetchQuizYNData])
    );

    const [selectedImage, setSelectedImage] = useState(null);

    const handleNavigateTodayQuiz = useCallback(() => {
        if(!quizYN) {
            navigation.navigate('TodayQuizGuideScreen', {
                screen: 'TodayQuizGuideScreen'
            });
        } else {
            setModalVisible(true);
        }
    }, [quizYN]);

    const handleNavigateCamera = useCallback(() => {
        navigation.navigate('CameraScreen');
    }, []);

    const [openQuest, setOpenQuest] = useState(false);

    const handleSelectAnswer = () => {
        setOpenQuest(!openQuest);
    };

    const handleSelectImage = () => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 0.5 },
            (response) => {
                if (response.errorMessage) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    if (!response.assets || response.assets.length === 0) {
                        console.log('Image not selected.');
                        return;
                    }

                    const selectedFile = response.assets[0];
                    const fileName = selectedFile.fileName ? selectedFile.fileName.toLowerCase() : '';

                    if (fileName.includes('screenshot')) {
                        Alert.alert('알림', '스크린샷은 업로드할 수 없습니다. 직접 촬영한 사진을 선택해주세요.');
                        return;
                    }

                    setSelectedImage(selectedFile);
                    navigation.navigate('QuestConfirmationScreen', { photoPath: selectedFile.uri });
                }
            }
        );
    };


    return (
        <View style={styles.container}>
            <MainHeader />
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
                        <Text style={styles.SeedsText}>{userReward}</Text>
                    </View>
                    <View style={styles.HomeTextContainer}>
                        <View style={styles.MainTextContainer}>
                            <Text style={styles.TitleText1}>반가워요, </Text>
                            <Text style={styles.YellowText}>{userName}</Text>
                            <Text style={styles.TitleText1}> 님!</Text>
                        </View>
                        <Text style={styles.TitleText2}>오늘도 우리 함께 달려보아요:)</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 5, marginBottom: 10}}>
                            {mainChar === null && (
                                <View style={styles.NullBackgroundWrapper}>
                                <Text style={styles.NullText}>하단 캐릭터 버튼을 눌러</Text>
                                <Text style={styles.NullText}>캐릭터 뽑기를 진행해보세요!</Text>
                                </View>
                            )}
                            {mainChar !== null && (
                                <View style={styles.MainBackgroundWrapper}>
                                    <Image source={require('../../img/Home/HomeCharBackground.png')} style={styles.MainBackground} />
                                    <Image source={getMainCharImage()} style={styles.MainChar} />
                                </View>
                            )}
                    </View>

                    <TouchableOpacity onPress={handleNavigateTodayQuiz}>
                    <View style={styles.QuizBox}>
                        <Text style={styles.BoldLargeText}>오늘의 퀴즈 풀기</Text>
                        <RightArrowIcon width={8} height={14} />
                    </View>
                    </TouchableOpacity>
                </View>
                </ImageBackground>

                <View style={[styles.CenteredCountContainer, {height: 153}]}>
                        <TouchableOpacity onPress={TreeInfo} style={styles.InfoContainer}>
                            <Image source={require('../../img/Home/InfoIcon.png')} style={styles.InfoIcon} />
                              {showTreeInfo && (
                                  <View style={styles.InfoBox}>
                                    <Image source={require('../../img/Home/CloseIcon.png')} style={{ width: 7, height: 7, position: 'absolute', alignSelf: 'flex-end', top: 12.5, right: 12.5 }}/>
                                    <Text style={styles.InfoText}>내가 줄인 이산화탄소의 양을</Text>
                                    <Text style={styles.InfoText}>나무 그루로 확인해볼 수 있어요!</Text>
                                  </View>
                              )}
                        </TouchableOpacity>
                    <View style={styles.TreeBox}>
                        <CircleThisMonthTreeIcon width={36} height={36} />
                        <View style={styles.TreeDetailBox}>
                            <Text style={styles.BoldSmallText}>{monthSavedTree}그루</Text>
                            <Text style={styles.GrayText}>이번 달 지킨 나무</Text>
                        </View>
                    </View>
                    <View style={styles.TreeBox}>
                        <CircleUserTreeIcon width={36} height={36} />
                        <View style={styles.TreeDetailBox}>
                            <Text style={styles.BoldSmallText}>{totalSavedTree}그루</Text>
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
                            <Text style={styles.MediumText}>{dailyQuest}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
                                <PedometerIcon width={39} />
                            </View>
                        </View>


                        <View style={[styles.MenuBoxHalf, { marginLeft: 8 }]}>
                            <View style={styles.HalfTitleContainer}>
                                <CircleStarIcon width={21} />
                                <Text style={[styles.BoldSmallText, {marginLeft: 7}]}>스페셜 퀘스트</Text>
                            </View>
                            <Text style={styles.MediumText}>{specialQuest}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
                                <QuestIcon width={56} />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MenuBox, {paddingLeft: 30}]} >
                        <TouchableOpacity onPress={() => navigation.navigate("QuestViewScreen")}>
                            <Text style={styles.BoldLargeText}>오늘의 인증</Text>
                            <Text style={styles.GrayText}>나의 친환경 활동을 인증해보세요!</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.MenuBox, {paddingLeft: 30}]}>
                        <Text style={styles.BoldLargeText}>친환경 활동 가이드</Text>
                        <Text style={styles.GrayText}>오늘의 친환경 활동을 실천해보세요!</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.floatingBtn}>
                <TouchableOpacity onPress={handleSelectAnswer}>
                    <FloatingButton width={71} height={71}/>
                </TouchableOpacity>
            </View>

            {modalVisible &&
              <Pressable style={styles.modalContainer} onPress={() => setModalVisible(false)}>
                <Pressable style={styles.modalView} onPress={e => e.stopPropagation()}>
                    <View style={styles.rowContainer}>
                      <Text style={styles.modalLargeText}>이미 </Text>
                      <Text style={[styles.modalLargeText, {color: colors.green}]}>오늘의 퀴즈를</Text>
                      <Text style={styles.modalLargeText}> 풀었어요!</Text>
                    </View>
                    <Text style={styles.modalSmallText}>내일 한 번 더 도전해보세요:)</Text>
                </Pressable>
              </Pressable>
            }

            {openQuest &&
            <View style={styles.openQuestOption}>
                <TouchableOpacity onPress={handleSelectImage}>
                <View style={[styles.questOption, {borderBottomWidth: 1, borderBottomColor: '#C9C9C9'}]}>
                    <Text style={styles.optionText}>갤러리</Text>
                    <Image source={require('../../img/Home/GalleryIcon.png')} style={styles.GalleryIcon} />
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNavigateCamera}>
                <View style={styles.questOption}>
                    <Text style={styles.optionText}>사진 촬영하기</Text>
                    <Image source={require('../../img/Home/CameraIcon.png')} style={styles.CameraIcon} />
                </View>
                </TouchableOpacity>
            </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        height: height * 0.62,
    },
    HomeMainContainer: {
    },
    MainBackgroundWrapper: {
        position: 'relative',
        width: '95%',
        height: 200,
    },
    NullBackgroundWrapper: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    NullText: {
        color: '#C1F6E6',
        fontSize: getFontSize(16),
        fontWeight: '800',
        lineHeight: 25,
        textAlign: 'center',
    },
    MainBackground: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    MainChar: {
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        transform: [{ translateX: -114 }, { translateY: +98 }],
        width: 268,
        height: 196,
    },
    scrollContainer: {
        backgroundColor: colors.lightgray,
        height: "140%",
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
        top: 20,
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
    InfoContainer: {
      position: 'absolute',
      top: 10,
      right: 0,
      alignItems: 'flex-end',
      paddingTop: 5,
      paddingRight: 16,
    },
    InfoIcon: {
      width: 16,
      height: 16,
      marginBottom: 5,
    },
    InfoBox: {
      marginLeft: 8,
      width: 166,
      padding: 12.5,
      borderColor: colors.gray,
      borderRadius: 3,
      borderWidth: 1,
    },
    InfoText: {
      color: colors.gray,
      fontSize: getFontSize(10),
      fontWeight: '400',
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
        height: 162,
        borderRadius: 15,
        padding: 20,
    },
    HalfTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    MediumText: {
        color: colors.lightblack,
        lineHeight: 20,
        fontSize: getFontSize(12),
        fontWeight: '400',
    },
    floatingBtn: {
        position: 'absolute',
        right: 0,
        bottom: 17,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },
    openQuestOption: {
        backgroundColor: colors.white,
        marginHorizontal: 16,
        position: 'absolute',
        justifyContent: 'space-evenly',
        alignContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.lightblack,
        borderRadius: 15,
        right: 0,
        bottom: 89,
        width: 136,
        height: 85,
    },
    questOption: {
        paddingHorizontal: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 42,
    },
    optionText:{
        color: colors.lightblack,
        lineHeight: 20,
        fontSize: getFontSize(13),
        fontWeight: '400',
    },
    GalleryIcon: {
        width: 26,
        height: 20,
    },
    CameraIcon: {
        width: 23,
        height: 17,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
     modalContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    modalView: {
        backgroundColor: colors.white,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
            blur: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
        width: 295,
        height: 172,
    },
    modalLargeText: {
        textAlign: 'center',
        fontSize: getFontSize(20),
        fontWeight: '800',
        color: colors.black,
    },
    modalSmallText: {
        textAlign: 'center',
        fontSize: getFontSize(15),
        fontWeight: '400',
        color: colors.lightblack,
        marginTop: 10,
    },
});

export default HomeScreen;

import * as React from 'react';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';
import LinearGradient from 'react-native-linear-gradient';

import SeedIcon from '../../img/Home/SeedIcon.svg';
import HomeMainIcon from '../../img/Home/HomeMainIcon.svg';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';

const { height } = Dimensions.get('window');

function HomeScreen(): React.JSX.Element {
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
                        <Text style={styles.SeedsText}>261</Text>
                    </View>
                    <View style={styles.HomeTextContainer}>
                        <Text style={styles.TitleText}>반가워요, 앱설런트 님!</Text>
                        <Text style={styles.TitleText}>오늘도 우리 함께 달려보아요:)</Text>
                    </View>
                    <HomeMainIcon width="100%" height="50%" />

                    <View style={[styles.MenuBox, {height: 48, marginTop: 12}]}>
                        <Text style={styles.BoldLargeText}>오늘의 퀴즈 풀기</Text>
                    </View>
                </View>
                </ImageBackground>

                <View style={styles.CenteredCountContainer}>
                    <View style={[styles.MenuBox, {height: 153}]}>
                        <View>
                            <Text style={styles.BoldSmallText}>5그루</Text>
                            <Text style={styles.GrayText}>이번 달 지킨 나무</Text>
                        </View>
                        <View>
                        <Text style={styles.BoldSmallText}>21그루</Text>
                        <Text style={styles.GrayText}>지금까지 지킨 나무</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.HomeMenuContainer}>
                    <View style={styles.HorizontalMenuBox}>
                        <View style={[styles.MenuBoxHalf, { marginRight: 8 }]}>
                            <Text>데일리 퀘스트</Text>
                        </View>

                        <View style={[styles.MenuBoxHalf, { marginLeft: 8 }]}>
                            <Text>스페셜 퀘스트</Text>
                        </View>
                    </View>

                    <View style={styles.MenuBox}>
                        <Text style={styles.BoldLargeText}>오늘의 인증</Text>
                        <Text style={styles.GrayText}>나의 친환경 활동을 인증해보세요!</Text>
                    </View>

                    <View style={[styles.MenuBox, {marginBottom: 21}]}>
                        <Text style={styles.BoldLargeText}>친환경 활동 가이드</Text>
                        <Text style={styles.GrayText}>오늘의 친환경 활동을 실천해보세요!</Text>
                    </View>
                </View>
            </ScrollView>
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
        paddingHorizontal: 16,
        marginTop: 0,
    },
    scrollContainer: {
        backgroundColor: colors.lightgray,
    },
    SeedsContainer: {
        marginTop: 12,
        flexDirection: 'row',
    },
    SeedsText: {
        color: colors.white,
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '800',
    },
    HomeTextContainer: {
        marginTop: 19,
        marginBottom: 15,
    },
    CenteredCountContainer: {
        justifyContent: 'center',
        paddingHorizontal: 16,
        bottom: 21, //top: 60
    },
    TitleText: {
        color: colors.white,
        textAlign: 'center',
        fontSize: getFontSize(23),
        fontWeight: '800',
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
    },
    HomeMenuContainer: {
       paddingHorizontal: 16,
       gap: 21,
    },
    HorizontalMenuBox: {
        flexDirection: 'row',
        justifyContent: 'center',
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
    }
});

export default HomeScreen;

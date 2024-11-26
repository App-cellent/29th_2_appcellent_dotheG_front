import * as React from 'react';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';

import SeedIcon from '../../img/Home/SeedIcon.svg';
import HomeMainIcon from '../../img/Home/HomeMainIcon.svg';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions
} from 'react-native';

const { height } = Dimensions.get('window');

function HomeScreen(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                        <HomeMainIcon width="100%" height="50%"/>
                    </View>
                </ImageBackground>
                <View style={styles.HomeMenuContainer}>
                    <View style={styles.MenuBox}>
                        <Text>오늘의 퀴즈 풀기</Text>
                    </View>

                    <View style={styles.MenuBox}>
                        <Text>5그루</Text>
                        <Text>21그루</Text>
                    </View>

                    <View style={styles.HorizontalMenuBox}>
                        <View style={styles.MenuBoxHalf}>
                            <Text>스페셜 퀘스트</Text>
                        </View>

                        <View style={styles.MenuBoxHalf}>
                            <Text>데일리 퀘스트</Text>
                        </View>
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
    },
    scrollContainer: {
        backgroundColor: colors.lightgray,
    },
    SeedsContainer: {
        marginTop: 12,
        flexDirection: 'row',
        position: 'fixed',
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
    TitleText: {
        color: colors.white,
        textAlign: 'center',
        fontSize: getFontSize(23),
        fontWeight: '800',
    },
    HomeMenuContainer: {
       paddingHorizontal: 16,
       gap: 21,
    },
    HorizontalMenuBox: {
        flexDirection: 'row',
    },
    MenuBox: {
        backgroundColor: colors.white,
        width: '100%',
        height: 88,
        borderRadius: 15,
    },
    MenuBoxHalf: {
        backgroundColor: colors.white,
        width: '50%',
        height: 88,
        borderRadius: 15,
    }
});

export default HomeScreen;

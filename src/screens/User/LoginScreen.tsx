import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { WebViewNavigation } from 'react-native-webview';
import Cookies from '@react-native-cookies/cookies';
import { Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    TextInput,
    Animated,
    Alert, 
    Modal
} from 'react-native';

import DoTheG from '../../img/Navigator/DoTheG.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [naverLoginVisible, setNaverLoginVisible] = useState(false); // 네이버 로그인 웹뷰 모달 상태
    const [cookie, setCookie] = useState<string | null>(null);

    const apiUrl = process.env.REACT_APP_API_URL;

    // tutorial 정보 가져오는 함수
    const fetchTutorialStatus = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const accessToken = await AsyncStorage.getItem('token');
            const tutorialResponse = await fetch(`${apiUrl}/mainpage/isTutorial?timestamp=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    "Cache-Control": 'no-store',
                    "Content-Type": "application/json",
                    access: `${accessToken}`,
                },
            });

            if (!tutorialResponse.ok) {
                throw new Error(`Error checking tutorial: ${tutorialResponse.status}`);
            }

            const result = await tutorialResponse.json();
            console.log(result);

            if (result.success) {
                if (result.data === false) {
                    navigation.navigate('Tutorial');
                } else {
                    navigation.navigate('Main');
                }
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Tutorial Error:', error);
        }
    };

    // 로그인 API (GradientButton onPress)
    const handleLogin = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        if (!apiUrl) {
            console.error('API URL is not defined in environment variables.');
            Alert.alert('오류', '서버 URL이 설정되지 않음.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    "Cache-Control": 'no-store',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Login failed: ${response.status} - ${response.statusText}\nResponse: ${errorText}`);
            }

            // 토큰을 헤더에서 가져와 AsyncStorage에 저장
            const token = response.headers.get('access');
            if (token) {
                await AsyncStorage.setItem('token', token);
                console.log('Login Success');

                // tutorial 여부 확인
                fetchTutorialStatus();
            } else {
                Alert.alert('로그인 실패', '토큰을 받을 수 없습니다.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('로그인 실패', '아이디나 비밀번호를 다시 확인해주세요.');
        }
    };

    // 간편하게 시작하기 애니메이션
    const speechBubbleAnimated = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(speechBubbleAnimated, {
                    toValue: -3,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(speechBubbleAnimated, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [speechBubbleAnimated]);

    // 자동로그인 체크
    const autoLoginCheck = () => {
        setIsChecked(!isChecked);
    };

    const handleNaverLogin = () => {
        setNaverLoginVisible(true);
    };

    // WebView에서 네이버 로그인 완료 시 호출될 함수
    const handleWebViewNavigationStateChange = async (event: WebViewNavigation) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const { url } = event;
        console.log('Naver Login Redirect URL: ', url);

        // 리디렉션된 URL 감지
        if (url.includes(`${apiUrl}/login/oauth2/code/naver`)) {
            try {
                // 리디렉션 후 쿠키를 가져오기
                const cookies = await Cookies.get(`${apiUrl}/login/oauth2/code/naver`);
                console.log('Cookies:', cookies);

                if (cookies?.authorization?.value) {
                    const token = cookies.authorization.value; // 토큰 추출
                    
                    setCookie(token); // 상태 업데이트
                    
                    await AsyncStorage.setItem('token', token); // AsyncStorage에 저장
                    console.log('토큰 저장 완료:', token);
                    
                    // 네이버 로그인 웹뷰 닫음
                    setNaverLoginVisible(false);
                    //navigation.replace('Main');

                    // tutorial 여부 확인
                    fetchTutorialStatus();
                } else {
                    console.warn('Authorization cookie not found');
                }
            } catch (error) {
                console.error('쿠키 가져오기 실패:', error);
            }
        }
    };

    return(
        <View style={styles.container}>
            <Image
                source={require('../../img/User/appLogo.png')}
                style={styles.appLogo}
            />
            <View style={styles.header}>
                <View style={styles.rowContainer}>
                    <Text style={styles.textBoldLarge}>지금, </Text>
                    <DoTheG width={93} height={34}/>
                    <Text style={styles.textSemiBoldLarge}>와 함께</Text>
                </View>
                <Text style={styles.textBoldLarge}>달려보세요!</Text>
            </View>

            <View style={styles.Wrapper}>
                <TextInput
                    style={styles.inputText}
                    placeholder="아이디를 입력해주세요"
                    placeholderTextColor="#C9C9C9"
                    keyboardType="default"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder="비밀번호를 입력해주세요"
                    placeholderTextColor="#C9C9C9"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={styles.option}>
                    <TouchableOpacity
                        style={styles.checkContainer}
                        onPress={autoLoginCheck}
                    >
                        <Image
                            source={isChecked
                                ? require('../../img/User/checkIcon.png')
                                : require('../../img/User/checkIconGray.png')}
                            style={styles.checkIcon}
                        />
                        <Text style={styles.checkText}>자동로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        //onPress={() => navigation.navigate('FindIdPwScreen')}
                    >
                        <Text style={styles.findText}>아이디/비밀번호 찾기</Text>
                    </TouchableOpacity>
                </View>

                {/* 로그인 버튼 */}
                <TouchableOpacity
                    style={[styles.BtnContainer]}
                    onPress={handleLogin}
                >
                    <LinearGradient
                        colors={['#9BC9FE', '#69E6A2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.completeButton}
                    >
                        <Text style={styles.completeButtonText}>로그인</Text>
                    </LinearGradient>
                </TouchableOpacity>
                
                {/* 회원가입 버튼 */}
                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => navigation.navigate('SignupScreen')}
                >
                    <Text style={styles.signupText}>회원가입</Text>
                </TouchableOpacity>

                {/* 간편하게 시작하기 */}
                <Animated.Image
                    source={require('../../img/User/speechBubble.png')}
                    style={[styles.speechBubble, { transform: [{ translateY: speechBubbleAnimated }] }]}
                />

                {/* 네이버 로그인 */}
                <TouchableOpacity onPress={handleNaverLogin}>
                <Image
                    source={require('../../img/User/naverIcon.png')}
                    style={styles.naverLogo}
                />
                </TouchableOpacity>
            </View>
            
            {/* 네이버 로그인 웹뷰 모달 */}
            <Modal visible={naverLoginVisible} animationType="slide">
                <View style={{ flex: 1 }}>
                    <WebView
                        source={{ uri: `${apiUrl}/oauth2/authorization/naver` }}
                        onNavigationStateChange={handleWebViewNavigationStateChange}
                        javaScriptEnabled
                        domStorageEnabled
                        sharedCookiesEnabled={true}  // 쿠키 공유 설정
                        thirdPartyCookiesEnabled={true} // 제3자 쿠키 허용
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    appLogo: {
        width: 150,
        height: 150,
        marginBottom: 16,
        marginTop: 70,
    },
    header: {
        marginBottom: 26,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    Wrapper: {
        paddingHorizontal: 37,
        width: '100%',
    },
    textBoldLarge: {
        fontSize: 24,
        fontWeight: 800,
        lineHeight: 34,
        color: '#121212',
        textAlign: 'center',
    },
    textSemiBoldLarge: {
        fontSize: 24,
        fontWeight: 600,
        lineHeight: 34,
        color: '#121212',
        textAlign: 'center',
    },
    inputText: {
        width: '100%',
        height: 47,
        fontSize: 14,
        fontWeight: 500,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#C9C9C9',
        marginBottom: 7,
        paddingLeft: 14,
    },
    option: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: -6,
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkIcon: {
        width: 16,
        height: 16,
    },
    checkText: {
        color: '#C9C9C9',
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 16,
        marginLeft: 4,
        marginRight: 116,
    },
    findText: {
        color: '#C9C9C9',
        fontSize: 10,
        fontWeight: 500,
        lineHeight: 34,
        textDecorationLine: 'underline',
    },
    BtnContainer: {
        height: 47,
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
    signupButton: {
        width: '100%',
        height: 47,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#69E6A2',
        marginTop: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 23,
    },
    signupText: {
        color: '#69E6A2',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 30,
        textAlign: 'center',
    },
    speechBubble: {
        width: 130,
        height: 40,
        marginBottom: 7,
        alignSelf: 'center',
    },
    naverLogo: {
        width: 36,
        height: 36,
        alignSelf: 'center',
    },
});

export default LoginScreen;
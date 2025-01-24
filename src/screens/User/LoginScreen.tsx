import * as React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity, 
    TextInput,
    Animated,
    Alert
} from 'react-native';

import GradientButton from '../../components/GradientButton';

function LoginScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;

    // 로그인 버튼 클릭시
    const handleLogin = async () => {
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    "Cache-Control":'no-store',
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            // response status
            if (response.status === 200) {
                console.log('Success');
                Alert.alert('로그인 성공', '홈 화면으로 이동합니다.');
                navigation.navigate('HomeScreen');
            } else {
                console.log('Login Failure');
                Alert.alert('로그인 실패', '아이디나 비밀번호를 다시 확인해주세요.');
            }
        } catch (error) {
            Alert.alert('오류 발생', '서버와의 통신 중 오류가 발생했습니다.');
            console.error(error);
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

    return(
        <View style={styles.container}>
            <Image
                source={require('../../img/User/appLogo.png')}
                style={styles.appLogo}
            />
            <Text style={styles.textLarge}>
                지금, <Text style={{ color: '#69E6A2' }}>Do the G</Text>와 함께{"\n"}달려보세요!
            </Text>

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
                    onPress={() => navigation.navigate('FindIdPwScreen')}
                >
                    <Text style={styles.findText}>아이디/비밀번호 찾기</Text>
                </TouchableOpacity>
            </View>

            <GradientButton
                height={47} width={286} text='로그인'
                onPress={handleLogin}
            />
            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('SignupScreen')}
            >
                <Text style={styles.signupText}>회원가입</Text>
            </TouchableOpacity>

            <Animated.Image
                source={require('../../img/User/speechBubble.png')}
                style={[styles.speechBubble, { transform: [{ translateY: speechBubbleAnimated }] }]}
            />
            <Image
                source={require('../../img/User/naverIcon.png')}
                style={styles.naverLogo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    appLogo: {
        width: 130,
        height: 130,
        marginTop: 100,
        marginBottom: 16,
    },
    textLarge: {
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 34,
        color: '#121212',
        textAlign: 'center',
        marginBottom: 29,
    },
    inputText: {
        width: 286,
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
    signupButton: {
        width: 286,
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
        fontWeight: 500,
        lineHeight: 30,
        textAlign: 'center',
    },
    speechBubble: {
        width: 130,
        height: 40,
        marginBottom: 7,
    },
    naverLogo: {
        width: 36,
        height: 36,
    },
})

export default LoginScreen;
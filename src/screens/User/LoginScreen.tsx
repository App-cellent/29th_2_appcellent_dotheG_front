import * as React from 'react'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { 
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity, 
    TextInput,
} from 'react-native';

import GradientButton from '../../components/GradientButton';

function LoginScreen(): React.JSX.Element {
    const navigation = useNavigation();

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
            />
            <TextInput
                style={styles.inputText}
                placeholder="비밀번호를 입력해주세요"
                placeholderTextColor="#C9C9C9"
                secureTextEntry
            />

            <View style={styles.option}>
                <View style={styles.checkContainer}>
                    <Image 
                        source={require('../../img/User/checkIconGray.png')}
                    />
                    <Text style={styles.checkText}>자동로그인</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('FindIdPwScreen')}
                >
                    <Text style={styles.findText}>아이디/비밀번호 찾기</Text>
                </TouchableOpacity>
            </View>

            <GradientButton
                height={47} width={286} text='로그인'
                onPress={() => navigation.navigate('HomeScreen')}
            />
            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('SignupScreen')}
            >
                <Text style={styles.signupText}>회원가입</Text>
            </TouchableOpacity>

            <Image
                source={require('../../img/User/speechBubble.png')}
                style={styles.speechBubble}
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
        width: 77,
        height: 77,
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
        lineHeight: 34,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#C9C9C9',
        marginBottom: 7,
        padding: 10,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkText: {
        color: '#C9C9C9',
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 20,
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
        width: 129,
        height: 37,
        marginBottom: 9,
    },
    naverLogo: {
        width: 36,
        height: 36,
    },
})

export default LoginScreen;
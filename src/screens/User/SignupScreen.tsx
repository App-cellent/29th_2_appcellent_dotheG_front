import * as React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';

import GradientButton from '../../components/GradientButton';

function SignupScreen(): React.JSX.Element {
    const navigation = useNavigation();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const [isIdValid, setIsIdValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isNicknameValid, setIsNicknameValid] = useState(false);

    const [idCheckResult, setIdCheckResult] = useState<string | null>(null);
    const [nicknameCheckResult, setNicknameCheckResult] = useState<string | null>(null);

    const [isAgreeChecked, setIsAgreeChecked] = useState(false);

    // 개인정보 동의
    const handleAgreeCheck = () => {
        setIsAgreeChecked(!isAgreeChecked);
    };

    // 아이디
    const handleIdCheck = (text: string) => {
        setId(text);
        const idRegex = /^[a-z0-9]{4,12}$/;
        setIsIdValid(idRegex.test(text));
        setIdCheckResult(null); // 중복 확인 결과 초기화
    };

    // 비밀번호
    const handlePasswordCheck = (text: string) => {
        setPassword(text);
        // 대문자 or 소문자, 숫자, 특수문자
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
        // 대문자, 소문자, 숫자, 특수문자 모두 포함
        //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
        setIsPasswordValid(passwordRegex.test(text));
        setIsPasswordMatch(text === confirmPassword);
    };

    // 비밀번호 확인
    const handleConfirmPasswordCheck = (text: string) => {
        setConfirmPassword(text);
        setIsPasswordMatch(password === text);
    };

    // 닉네임
    const handleNicknameCheck = (text: string) => {
        setNickname(text);
        const nicknameRegex = /^[가-힣]+$/;
        setIsNicknameValid(nicknameRegex.test(text));
        setNicknameCheckResult(null); // 중복 확인 결과 초기화
    };

    // 아이디 중복확인
    const checkIdAvailability = () => {
        if (id === 'duplicateId') {
            setIdCheckResult('중복되는 아이디입니다.');
        } else {
            setIdCheckResult('사용 가능한 아이디입니다.');
        }
    };

    // 닉네임 중복확인
    const checkNicknameAvailability = () => {
        if (nickname === '중복닉네임') {
            setNicknameCheckResult('중복 닉네임입니다.');
        } else {
            setNicknameCheckResult('사용 가능한 닉네임입니다.');
        }
    };

    // 모든 입력 조건 충족 시 가입하기 버튼 활성화
    const isFormValid =
        isIdValid &&
        isPasswordValid &&
        isPasswordMatch &&
        isNicknameValid &&
        isAgreeChecked;
    
    // 회원가입 API (GradientButton onPress)
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchSignupData = async () => {
        const formData = new FormData();

        formData.append('userName', nickname); // 두더지, 수달, 참매, 꿀벌
        formData.append('userLogin', id); // user1, user2, user3, user4
        formData.append('userPassword', password); // test123@

        try {
            const response = await fetch(`${apiUrl}/users/signup`, {
                method: 'POST',
                headers: {
                    "Cache-Control":'no-store',
                    "Accept":"application/json",
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                console.log('API response:', result);
                //Alert.alert(result.message);
                navigation.navigate('WelcomeScreen', { nickname });
            } else {
                Alert.alert(result.message || '회원가입 실패');
            }
        } catch (error) {
            console.error('회원가입 에러:', error);
            Alert.alert('회원가입 에러 발생');
        }
    };

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity  
                    onPress={() => navigation.goBack()}
                    style={styles.closeIconContainer}
                >
                    <Image
                        source={require('../../img/User/closeIcon.png')}
                        style={styles.closeIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>회원가입</Text>
            </View>
            <View style={styles.bodyContainer}>
                
                {/* 아이디 */}
                <Text style={styles.labelText}>아이디</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.idNicknameInputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="아이디를 설정해주세요"
                            placeholderTextColor="#C9C9C9"
                            value={id}
                            onChangeText={handleIdCheck}
                        />
                        {id.length > 0 && (
                            <Image
                                source={isIdValid
                                    ? require('../../img/User/checkIcon.png')
                                    : require('../../img/User/warnIcon.png')}
                                style={styles.smallCheckIcon}
                            />
                        )}
                    </View>
                    <TouchableOpacity
                        style={[styles.confirmButton, isIdValid && { backgroundColor: '#69E6A2' }]}
                        onPress={checkIdAvailability}
                    >
                        <Text 
                            style={[styles.confirmButtonText, isIdValid && { color: '#FFFFFF' }]}
                        >중복확인</Text>
                    </TouchableOpacity>
                </View>
                <Text 
                    style={
                        id.length === 0
                            ? styles.redText
                            : isIdValid
                            ? styles.greenText
                            : styles.redText
                    }
                >
                    {id.length === 0
                        ? '영문 소문자와 숫자만 사용해서 4~12자의 아이디를 입력해주세요.'
                        : isIdValid
                        ? '사용 가능한 아이디입니다.'
                        : '중복되는 아이디입니다.'}
                </Text>
                
                {/* 비밀번호 */}
                <Text style={styles.labelText}>비밀번호</Text>
                <View style={styles.inputPwContainer}>
                    <TextInput
                        style={styles.inputPwText}
                        placeholder="비밀번호를 설정해주세요"
                        placeholderTextColor="#C9C9C9"
                        secureTextEntry
                        value={password}
                        onChangeText={handlePasswordCheck}
                    />
                    {password.length > 0 && (
                        <Image
                            source={
                                isPasswordValid
                                    ? require('../../img/User/checkIcon.png')
                                    : require('../../img/User/warnIcon.png')
                            }
                            style={styles.smallCheckIcon}
                        />
                    )}
                </View>
                <Text 
                    style={
                        password.length === 0
                            ? styles.redText
                            : isPasswordValid
                            ? styles.greenText
                            : styles.redText
                    }
                >
                    {password.length === 0
                        ? '영문 대문자와 소문자, 숫자, 특수문자를 조합하여 6~20자로 입력해주세요.'
                        : isPasswordValid
                            ? '사용 가능한 비밀번호입니다.'
                            : '사용 불가능한 비밀번호입니다. 특수문자를 조합해주세요.'}
                </Text>

                {/* 비밀번호 확인 */}
                <View style={styles.inputPwContainer}>
                    <TextInput
                        style={[ styles.inputPwText, {marginVertical: 6} ]}
                        placeholder="비밀번호 확인"
                        placeholderTextColor="#C9C9C9"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordCheck}
                    />
                    {password.length > 0 && confirmPassword.length > 0 && (
                        <Image
                            source={
                                isPasswordMatch
                                    ? require('../../img/User/checkIcon.png')
                                    : require('../../img/User/warnIcon.png')
                            }
                            style={styles.smallCheckIcon}
                        />
                    )}
                </View>
                <View style={styles.messageContainer}>
                    {(password.length > 0 && confirmPassword.length > 0) && (
                        <Text
                            style={isPasswordMatch ? styles.greenText : styles.redText}
                        >
                            {isPasswordMatch
                                ? '비밀번호가 일치합니다.'
                                : '비밀번호가 일치하지 않습니다.'}
                        </Text>
                    )}
                </View>
                
                {/* 닉네임 */}
                <Text style={styles.labelText}>닉네임</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.idNicknameInputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="닉네임을 설정해주세요"
                            placeholderTextColor="#C9C9C9"
                            value={nickname}
                            onChangeText={handleNicknameCheck}
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.confirmButton, isNicknameValid && { backgroundColor: '#69E6A2' }]}
                        onPress={checkNicknameAvailability}
                    >
                        <Text 
                            style={[styles.confirmButtonText, isNicknameValid && { color: '#FFFFFF' }]}
                        >중복확인</Text>
                    </TouchableOpacity>
                </View>
                <Text 
                    style={
                        nickname.length === 0
                            ? styles.redText
                            : isNicknameValid
                            ? styles.greenText
                            : styles.redText
                    }
                >
                    {nickname.length === 0
                        ? '한글로만 닉네임을 설정해주세요.'
                        : isNicknameValid
                        ? '사용 가능한 닉네임입니다.'
                        : '중복 닉네임입니다.'}
                </Text>
                
                {/* 개인정보 동의 */}
                <Text style={styles.labelText}>개인정보 동의</Text>
                <View style={styles.agreeContainer}>
                    <TouchableOpacity onPress={handleAgreeCheck}>
                        <Image
                            source={isAgreeChecked
                                ? require('../../img/User/checkIcon.png')
                                : require('../../img/User/checkIconGray.png')}
                            style={styles.checkIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.agreeText}>실시간 만보기 측정을 위한 현재 위치 측정{"\n"}사용 동의</Text>
                </View>
                <Text style={styles.greenText}>만보기 측정을 통해 캐릭터 리워드를 받을 때 필요해요!</Text>
            </View>

            {/* 가입하기 */}
            <View style={styles.signupButtonContainer}>
                {isFormValid ? (
                    <View style={styles.gradientButtonContainer}>
                        <GradientButton
                            height={52} width={362} text="가입하기"
                            onPress={fetchSignupData}
                        />
                    </View>
                ) : (
                    <TouchableOpacity style={styles.signupButton} disabled>
                        <Text style={styles.signupText}>가입하기</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header: {
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    closeIconContainer: {
        position: 'absolute',
        left: 22,
        bottom: 18.92,
        zIndex: 1,
    },
    closeIcon: {
        width: 18.34,
        height: 18.08,
    },
    headerText: {
        flex: 1,
        color: '#393939',
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 34,
        textAlign: 'center',
    },
    bodyContainer: {
        marginTop: 90,
        marginLeft: 24,
        justifyContent: 'flex-start',
    },
    labelText: {
        color: '#545454',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 34,
        marginLeft: 3,
        marginTop: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    idNicknameInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 243,
        height: 47,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    inputText: {
        color: '#121212',
        fontSize: 14,
        fontWeight: 500,
        justifyContent: 'center',
    },
    inputPwContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 362,
        height: 47,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    inputPwText: {
        color: '#121212',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 34,
        justifyContent: 'center',
        height: '100%',
    },
    confirmButton: {
        backgroundColor: '#F7F7F7',
        width: 111,
        height: 47,
        borderRadius: 10,
        justifyContent: 'center',
    },
    confirmButtonText: {
        color: '#C9C9C9',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 34,
        textAlign: 'center',
    },
    agreeContainer: {
        width: 362,
        height: 77,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        backgroundColor: '#F7F7F7',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#69E6A2',
    },
    checkIcon: {
        width: 22,
        height: 22,
        marginLeft: 18,
    },
    smallCheckIcon: {
        width: 13,
        height: 13,
    },
    agreeText: {
        color: '#121212',
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 18,
    },
    messageContainer: {
        minHeight: 20,
        justifyContent: 'center',
    },
    redText: {
        color: '#FF5959',
        fontSize: 11,
        fontWeight: 400,
        lineHeight: 20,
        marginLeft: 3,
        marginTop: 5,
        marginBottom: 10,
    },
    greenText: {
        color: '#69E6A2',
        fontSize: 11,
        fontWeight: 400,
        lineHeight: 20,
        marginLeft: 3,
        marginTop: 5,
        marginBottom: 10,
    },
    gradientButtonContainer: {
        alignSelf: 'center',
    },
    signupButtonContainer: {
        marginTop: 'auto',
        marginBottom: 70,
    },
    signupButton: {
        backgroundColor: '#EEEEEE',
        width: 362,
        height: 52,
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    signupText: {
        color: '#C9C9C9',
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 34,
        textAlign: 'center',
    },
})

export default SignupScreen;
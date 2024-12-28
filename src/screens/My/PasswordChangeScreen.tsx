import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function PasswordChangeScreen({ navigation }) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isPasswordEntered = password.length > 0;
  const isNewPasswordEntered = newPassword.length > 0;
  const isConfirmPasswordEntered = confirmPassword.length > 0;
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const isChangePwButtonEnabled = isPasswordValid && isNewPasswordValid && isPasswordsMatch;
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const handlePasswordCheck = () => {
    if (password === '1234') {
      setIsPasswordValid(true);
      alert('비밀번호 확인 완료');
    } else {
      setIsPasswordValid(false);
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleNewPasswordCheck = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    if (regex.test(newPassword)) {
      setIsNewPasswordValid(true);
      alert('새로운 비밀번호 확인 완료');
    } else {
      setIsNewPasswordValid(false);
      alert('영문 대소문자, 숫자, 특수문자를 조합하여 6~20자로 입력해주세요.');
    }
  };

  const handleConfirmPasswordCheck = () => {
    if (newPassword === confirmPassword) {
      setIsPasswordsMatch(true);
      alert('비밀번호 확인 완료');
    } else {
      setIsPasswordsMatch(false);
      alert('새로운 비밀번호와 일치하지 않습니다.');
    }
  };

  const handleChangePassword = () => {
    setIsPasswordChanged(true);

    // 2초 후 홈 화면으로 이동
    setTimeout(() => {
      navigation.navigate('Main');
    }, 2000);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* 비밀번호 변경 여부에 따른 화면 상태 */}
      {isPasswordChanged ? (
        <View style={styles.successMessageContainer}>
          <ImageBackground
            source={require('../../img/My/pwchangecircle.png')}
            style={styles.successMessageImage}
          >
            <View style={styles.textOverlay}>
              <Text style={styles.successMessageText}>비밀번호가 변경되었어요 :)</Text>
              <Text style={styles.subMessageText}>다시 로그인 화면으로 돌아갑니다.</Text>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <>
          {/* 상단바 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../img/My/exit.png')}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>비밀번호 변경</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.newPwText}>
              <Text style={{ color: '#69E6A2', fontWeight: 'bold' }}>본인확인</Text>을 진행해주세요.
            </Text>

            {/* 현재 비밀번호 입력 */}
            <Text style={styles.inputLabel}>현재 비밀번호 입력</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.inputBox}
                placeholder="비밀번호를 입력해주세요."
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: isPasswordEntered ? '#69E6A2' : '#F7F7F7' }]}
                onPress={handlePasswordCheck}
                disabled={!isPasswordEntered}
              >
                <Text style={[styles.confirmButtonText, { color: isPasswordEntered ? '#FFFFFF' : '#C9C9C9' }]}>
                  확인
                </Text>
              </TouchableOpacity>
            </View>

            {/* 새로운 비밀번호 입력 */}
            <Text style={styles.inputLabel}>새로운 비밀번호 입력</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.inputBox}
                placeholder="6~20자"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: isNewPasswordEntered ? '#69E6A2' : '#F7F7F7' }]}
                onPress={handleNewPasswordCheck}
                disabled={!isNewPasswordEntered}
              >
                <Text style={[styles.confirmButtonText, { color: isNewPasswordEntered ? '#FFFFFF' : '#C9C9C9' }]}>
                  확인
                </Text>
              </TouchableOpacity>
            </View>

            {/* 안내 텍스트 */}
            <Text style={styles.passwordRuleText}>
              영문 대소문자와 소문자, 숫자, 특수문자를 조합하여 6~20자로 입력해주세요.
            </Text>

            {/* 비밀번호 확인 */}
            <Text style={styles.inputLabel}>비밀번호 확인</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.inputBox}
                placeholder="6~20자"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: isConfirmPasswordEntered ? '#69E6A2' : '#F7F7F7' }]}
                onPress={handleConfirmPasswordCheck}
                disabled={!isConfirmPasswordEntered}
              >
                <Text style={[styles.confirmButtonText, { color: isConfirmPasswordEntered ? '#FFFFFF' : '#C9C9C9' }]}>
                  확인
                </Text>
              </TouchableOpacity>
            </View>

            {/* 비밀번호 변경 버튼 */}
            {!isKeyboardVisible && (
              <View style={styles.changePwButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.changePwButton,
                    isChangePwButtonEnabled
                      ? { backgroundColor: 'transparent', borderWidth: 0 }
                      : { backgroundColor: '#EEEEEE' },
                  ]}
                  disabled={!isChangePwButtonEnabled}
                  onPress={handleChangePassword}
                >
                  {isChangePwButtonEnabled ? (
                    <LinearGradient
                      colors={['#9BC9FE', '#69E6A2']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.gradientBackground}
                    >
                      <Text style={styles.changePwButtonText}>
                        비밀번호 변경
                      </Text>
                    </LinearGradient>
                  ) : (
                    <Text style={[styles.changePwButtonText, { color: '#C9C9C9' }]}>
                      비밀번호 변경
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: 56,
  },
  closeIcon: {
    width: 18.34,
    height: 18.08,
    marginLeft: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#393939',
    position: 'absolute',
    left: '40%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
  },
  newPwText: {
    fontSize: 18,
    fontWeight: 'medium',
    color: '#545454',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#545454',
    marginLeft: 27,
    marginTop: 25,
    fontWeight: 'medium',
  },
  passwordInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 24,
  },
  inputBox: {
    height: 47,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: '#F7F7F7',
    width: '67.5%',
  },
  confirmButton: {
    height: 47,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    width: 111,
  },
  confirmButtonText: {
    color: '#C9C9C9',
    fontWeight: 'bold',
    fontSize: 14,
  },
  passwordRuleText: {
    fontSize: 11,
    color: '#FF5959',
    marginTop: 10,
  },
  changePwButtonContainer: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 24,
  },
  changePwButton: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  gradientBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  changePwButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  successMessageImage: {
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  successMessageText: {
    color: '#121212',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subMessageText: {
    color: '#545454',
    fontSize: 13,
    fontWeight: 'medium',
    marginTop:10,
  },
});

export default PasswordChangeScreen;

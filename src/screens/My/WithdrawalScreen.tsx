import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';

function WithdrawalScreen({ navigation }): React.JSX.Element {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [withdrawalModalVisible, setWithdrawalModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const isPasswordEntered = password.length > 0;
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [isAgreed, setIsAgreed] = useState(false);
  const isWithdrawButtonEnabled = isPasswordValid && (selectedReasons.length > 0 || customReason.length > 0) && isAgreed;

  const openWithdrawalModal = () => {
    setWithdrawalModalVisible(true);
  };

  const closeWithdrawalModal = () => {
    setWithdrawalModalVisible(false);
  };

  const handleWithdrawal = () => {
    alert("탈퇴가 완료되었습니다.");
    setWithdrawalModalVisible(false);
  };

  const handlePasswordCheck = () => {
    if (password === '1234') {
      setIsPasswordValid(true);
      alert('비밀번호 확인 완료');
    } else {
      setIsPasswordValid(false);
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const toggleReasonSelection = (reasonText: string) => {
    setSelectedReasons((prevSelectedReasons) => {
      if (prevSelectedReasons.includes(reasonText)) {
        return prevSelectedReasons.filter((item) => item !== reasonText);
      } else {
        return [...prevSelectedReasons, reasonText];
      }
    });
  };

  const toggleAgreement = () => {
    setIsAgreed((prev) => !prev);
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
    <ScrollView style={styles.container}>
      {/* 상단바 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../img/My/exit.png')}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>탈퇴하기</Text>
      </View>

      {/* 본인확인 텍스트 */}
      <View style={styles.content}>
        <Text style={styles.confirmationText}>
          <Text style={{ color: '#69E6A2', fontWeight: 'bold' }}>본인확인</Text>을 진행해주세요.
        </Text>

        {/* 비밀번호 입력 */}
        <Text style={styles.inputLabel}>비밀번호 입력</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="비밀번호를 입력해주세요."
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={[
              styles.confirmButton,
              { backgroundColor: isPasswordEntered ? '#69E6A2' : '#F7F7F7' },
            ]}
            onPress={handlePasswordCheck}
            disabled={!isPasswordEntered}
          >
            <Text
              style={[
                styles.confirmButtonText,
                { color: isPasswordEntered ? '#FFFFFF' : '#C9C9C9' },
              ]}
            >
              확인
            </Text>
          </TouchableOpacity>
        </View>

        {/* 탈퇴 사유 선택 */}
        <Text style={styles.inputLabel}>탈퇴 사유 선택</Text>
        <View style={styles.reasonContainer}>
          {['인증할 수 있는 활동이 너무 적어요.', '성과 보고서가 체계적이지 않아요.', '캐릭터가 마음에 안 들어요.'].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.reasonBox}
              onPress={() => toggleReasonSelection(item)}
            >
              <Text style={styles.reasonText}>{item}</Text>
              <Image
                source={
                  selectedReasons.includes(item)
                    ? require('../../img/My/smallchecked.png')
                    : require('../../img/My/smallunchecked.png')
                }
                style={styles.smallCheckboxIcon}
              />
            </TouchableOpacity>
          ))}
          <TextInput
            style={[styles.inputBox, styles.reasonBox]}
            placeholder="기타 사유를 입력해주세요."
            value={customReason}
            onChangeText={setCustomReason}
          />
        </View>

        {/* 경고 문구 */}
        <View style={styles.warningContainer}>
          <View style={styles.warningItem}>
            <Image
              source={require('../../img/My/alerticon.png')}
              style={styles.warningIcon}
            />
            <Text style={styles.warningText}>
              지금 탈퇴하시면 리워드가 함께 사라져 추후에 동일 계정으로{'\n'}재가입하셔도 만보기와 캐릭터 내역이 복구되지 않아요!
            </Text>
          </View>
          <View style={styles.warningItem}>
            <Image
              source={require('../../img/My/alerticon.png')}
              style={styles.warningIcon}
            />
            <Text style={styles.warningText}>
              인증한 퀘스트와 나의 성과 보고서 내용이 사라져요.{'\n'}재가입하셔도 모든 내역이 복구되지 않아요!
            </Text>
          </View>
        </View>
      </View>

      {/* 동의 사항 */}
      <View style={styles.agreementContainer}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={toggleAgreement}>
          <Image
            source={isAgreed
              ? require('../../img/My/bigchecked.png')
              : require('../../img/My/bigunchecked.png')}
            style={styles.checkboxIcon}
          />
        </TouchableOpacity>
        <Text style={styles.agreementText}>
          회원 탈퇴 유의사항을 확인했으며 동의합니다.
        </Text>
      </View>

      {/* 탈퇴하기 버튼 */}
      {!isKeyboardVisible && (
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.withdrawButton,
            isWithdrawButtonEnabled
              ? {
                  backgroundColor: '#FFFFFF',
                  borderColor: '#69E6A2',
                  borderWidth: 1,
                }
              : { backgroundColor: '#EEEEEE' },
          ]}
          onPress={openWithdrawalModal}
          disabled={!isWithdrawButtonEnabled}
        >
          <Text
            style={[
              styles.withdrawButtonText,
              isWithdrawButtonEnabled
                ? { color: '#69E6A2' }
                : { color: '#C9C9C9' },
            ]}
          >
            탈퇴하기
          </Text>
        </TouchableOpacity>
        </View>
      )}

      {/* 탈퇴하기 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={withdrawalModalVisible}
        onRequestClose={closeWithdrawalModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, styles.shadowEffect]}>
            <Text style={styles.modalTitle}>탈퇴하기</Text>
            <Text style={styles.modalSubtitle}>정말 탈퇴하시겠습니까?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.withdrawConfirmButton, { backgroundColor: '#FF5959' }]} onPress={handleWithdrawal}>
                <Text style={styles.withdrawConfirmButtonText}>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelConfirmButton} onPress={closeWithdrawalModal}>
                <Text style={styles.cancelConfirmButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
    left: '44%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
  },
  confirmationText: {
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
    marginTop: 5,
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
  reasonContainer: {
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 24,
  },
  reasonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 47,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  reasonText: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#545454',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    width: '100%',
  },
  withdrawButton: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 20,
  },
  withdrawButtonText: {
    color: '#C9C9C9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningContainer: {
    width: '100%',
    marginTop: 32,
    paddingHorizontal: 40,
  },
  warningItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  warningIcon: {
    width: 12,
    height: 12,
    marginTop: 3,
    marginRight: 5,
  },
  warningText: {
    fontSize: 12,
    fontWeight: 'medium',
    color: '#545454',
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 32,
    marginBottom: 40,
  },
  checkboxContainer: {
    marginRight: 7,
  },
  checkboxIcon: {
    width: 22,
    height: 22,
  },
  smallCheckboxIcon: {
    width: 16,
    height: 16,
  },
  agreementText: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#545454',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    width: '80%',
    minHeight: 279,
    alignItems: 'center',
  },
  shadowEffect: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#121212',
  },
  modalSubtitle: {
    fontSize: 15,
    fontWeight: 'medium',
    marginBottom: 25,
    color: '#545454',
  },
  modalButtonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  cancelConfirmButton: {
    width: '100%',
    height: 57,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelConfirmButtonText: {
    color: '#C9C9C9',
    fontSize: 18,
    fontWeight: 'medium',
  },
  withdrawConfirmButton: {
    width: '100%',
    height: 57,
    backgroundColor: '#69E6A2',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  withdrawConfirmButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'medium',
  },
});

export default WithdrawalScreen;

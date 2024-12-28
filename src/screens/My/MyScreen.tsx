import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';

function MyScreen({ navigation }): React.JSX.Element {
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [userName, setUserName] = useState("앱설런트");
  const [userId, setUserId] = useState("Appcellent123");
  const [nicknameModalVisible, setNicknameModalVisible] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const toggleAlarm = () => {
    setAlarmEnabled(!alarmEnabled);
  };

  const openNicknameModal = () => {
    setNicknameModalVisible(true);
  };

  const closeNicknameModal = () => {
    setNicknameModalVisible(false);
  };

  const handleChangeNickname = () => {
    if (newNickname.trim()) {
      setUserName(newNickname);
      setNewNickname("");
      setNicknameModalVisible(false);
    } else {
      alert("닉네임을 입력해주세요.");
    }
  };

  const openLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직 추가
    alert("로그아웃 되었습니다.");
    setLogoutModalVisible(false);
  };

  const goToWithdrawalScreen = () => {
    navigation.navigate('WithdrawalScreen');
  };

  const goToAlarmScreen = () => {
    navigation.navigate('AlarmScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../img/My/profileimage.png')}
          style={styles.profileImage}
        />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userId}>{userId}</Text>
        </View>
        <TouchableOpacity style={styles.nicknameButton} onPress={openNicknameModal}>
          <Image
            source={require('../../img/My/changenickname.png')}
            style={styles.nicknameButtonImage}
          />
        </TouchableOpacity>
      </View>

      {/* 알림 히스토리 */}
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Text style={styles.boxText}>알림 히스토리</Text>
          <TouchableOpacity onPress={goToAlarmScreen}>
            <Image
              source={require('../../img/My/arrowright.png')}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        </View>

        {/* 푸시알림 설정 */}
        <View style={styles.box}>
          <Text style={styles.boxText}>푸시알림 설정</Text>
          <TouchableOpacity onPress={toggleAlarm}>
            <Image
              source={
                alarmEnabled
                  ? require('../../img/My/pushalarmon.png')
                  : require('../../img/My/pushalarmoff.png')
              }
              style={styles.alarmButtonImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 회색 구분선 */}
      <View style={styles.separator} />

      {/* 비밀번호 변경하기 */}
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Text style={styles.boxText}>비밀번호 변경하기</Text>
          <TouchableOpacity>
            <Image
              source={require('../../img/My/arrowright.png')}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        </View>

        {/* 로그아웃 */}
        <View style={styles.box}>
          <Text style={styles.boxText}>로그아웃</Text>
          <TouchableOpacity onPress={openLogoutModal}>
            <Image
              source={require('../../img/My/arrowright.png')}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 회색 구분선 */}
      <View style={styles.separator} />

      {/* 탈퇴하기 */}
      <View style={styles.boxContainer}>
        <View style={styles.deleteAccountBox}>
          <Text style={styles.boxText}>탈퇴하기</Text>
          <TouchableOpacity onPress={goToWithdrawalScreen}>
            <Image
              source={require('../../img/My/arrowright.png')}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 닉네임 변경 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={nicknameModalVisible}
        onRequestClose={closeNicknameModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>닉네임 설정</Text>
            <Text style={styles.modalSubtitle}>변경할 닉네임을 입력해주세요.</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                value={newNickname}
                onChangeText={setNewNickname}
              />
              <TouchableOpacity>
                <Text style={styles.duplicateCheckText}>중복확인</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.cancelChangeButton} onPress={closeNicknameModal}>
                <Text style={styles.cancelChangeButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.changeButton} onPress={handleChangeNickname}>
                <Text style={styles.changeButtonText}>변경하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 로그아웃 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={closeLogoutModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>로그아웃</Text>
            <Text style={styles.modalSubtitle}>로그아웃하시겠습니까?</Text>
            <View style={styles.logoutModalButtonContainer}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleLogout}>
                <Text style={styles.confirmButtonText}>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={closeLogoutModal}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 54,
    height: 54,
    marginRight: 13,
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#545454',
  },
  userId: {
    fontSize: 11,
    fontWeight: 'regular',
    color: '#C9C9C9',
  },
  nicknameButton: {
    marginRight: 7,
  },
  nicknameButtonImage: {
    width: 15,
    height: 15,
  },
  boxContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#545454',
  },
  arrowImage: {
    width: 8,
    height: 12,
  },
  alarmButtonImage: {
    width: 36,
    height: 19,
  },
  separator: {
    height: 8,
    marginTop:7,
    marginBottom:7,
    backgroundColor: '#F3F4F6',
  },
  deleteAccountBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:5,
    bottom:40,
    width: '100%',
    height: 125,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: 5,
    padding: 10,
    color: '#545454',
  },
  duplicateCheckText: {
    position: 'absolute',
    right: 15,
    bottom: -10,
    fontSize: 13,
    color: '#69E6A2',
    fontWeight: 'medium',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    paddingHorizontal:1,
    bottom: 15,
  },
  cancelChangeButton: {
    width: '48%',
    height:57,
    backgroundColor: '#ffffff',
    borderColor: '#69E6A2',
    borderWidth:1,
    borderRadius: 15,
    marginRight:13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelChangeButtonText: {
    color: '#69E6A2',
    fontSize: 15,
    fontWeight: 'medium',
  },
  changeButton: {
    width: '48%',
    height:57,
    backgroundColor: '#69E6A2',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'medium',
  },
  logoutModalButtonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    width: '100%',
    height:57,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#C9C9C9',
    fontSize: 18,
    fontWeight: 'medium',
  },
  confirmButton: {
    width: '100%',
    height: 57,
    backgroundColor: '#69E6A2',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'medium',
  },
});

export default MyScreen;

import React, { useState,useEffect } from 'react';
import MainHeader from '../../components/MainHeader';
import PushNotification from 'react-native-push-notification';
import axios from "axios";
import { REACT_APP_API_URL, ACCESS_TOKEN } from '@env';

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
  const [dailySteps, setDailySteps] = useState(7000);
  const [weeklySteps, setWeeklySteps] = useState(50000);
  const DAILY_GOAL = 7000;
  const WEEKLY_GOAL = 50000;

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = ACCESS_TOKEN;
      try {
        const response = await fetch(`${REACT_APP_API_URL}/mypage/info`, {
          method: 'GET',
          headers: {
            access: token,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("받은 사용자 데이터:", data);
        setUserName(data.data.userName);
        setUserId(data.data.userLogin);
        //setAlarmEnabled(data.data.user);
      } catch (error) {
        console.error("사용자 정보 가져오기 중 오류 발생", error);
      }
    };

    fetchUserInfo();
  }, []);


  const openNicknameModal = () => {
    setNicknameModalVisible(true);
  };

  const closeNicknameModal = () => {
    setNicknameModalVisible(false);
  };

  const handleChangeNickname = async () => {
    if (newNickname.trim()) {
      const token = ACCESS_TOKEN; // 사용할 토큰

      try {
        // 닉네임 변경을 위한 fetch 요청
        const response = await fetch(
          `${REACT_APP_API_URL}/mypage/changeName?newName=${newNickname}`,
          {
            method: 'PATCH', // PATCH 요청으로 변경
            headers: {
              access: token
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // 서버 응답 데이터 처리
        console.log("받은 응답:", data);
        if (data.success) {
          setUserName(newNickname); // 닉네임을 업데이트
          setNewNickname(""); // 입력 필드 초기화
          setNicknameModalVisible(false); // 모달 닫기
          alert("닉네임이 변경되었습니다.");
        } else {
          alert("닉네임 변경에 실패했습니다.");
        }
      } catch (error) {
        console.error("닉네임 변경 중 오류가 발생했습니다.", error);
        alert("서버 오류로 닉네임 변경에 실패했습니다.");
      }
    } else {
      alert("닉네임을 입력해주세요.");
    }
  };

  /*
  const handleChangeNickname = () => {
    if (newNickname.trim()) {
      setUserName(newNickname);
      setNewNickname("");
      setNicknameModalVisible(false);
    } else {
      alert("닉네임을 입력해주세요.");
    }
  };
  */

  const openLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    setLogoutModalVisible(false);
  };

  const goToWithdrawalScreen = () => {
    navigation.navigate('WithdrawalScreen');
  };

  const goToAlarmScreen = () => {
    navigation.navigate('AlarmScreen');
  };

  const goToPasswordChangeScreen = () => {
    navigation.navigate('PasswordChangeScreen');
  };

  const toggleAlarm = async () => {
    const token = ACCESS_TOKEN; // 사용할 토큰

    try {
      // 알림 설정 변경을 위한 PATCH 요청
      const response = await fetch(`${REACT_APP_API_URL}/mypage/toggleNoti`, {
        method: 'PATCH',
        headers: {
          access: token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // 서버 응답 데이터 처리
      console.log('알림 설정 변경 응답:', data);
      if (data.success) {
        setAlarmEnabled(!alarmEnabled); // 알림 설정 상태 변경
        console.log("알림 설정이 성공적으로 변경되었습니다.");
      } else {
        alert("알림 설정 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("알림 설정 변경 중 오류가 발생했습니다.", error);
      alert("서버 오류로 알림 설정 변경에 실패했습니다.");
    }
  };

  /*
  const toggleAlarm = () => {
    setAlarmEnabled(!alarmEnabled);
  };
  */

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: "default-channel",
        channelName: "Default Channel",
      },
      (created) => {
        console.log(created ? "알림 채널 생성 성공!" : "알림 채널이 이미 존재합니다.");
      }
    );

    if (alarmEnabled) {
      scheduleNotifications();
      console.log("알림이 활성화되었습니다.");
    } else {
      console.log("알림이 비활성화되었습니다.");
    }
  }, [alarmEnabled]);

  const scheduleNotifications = () => {
    // 월간 성과보고서 알림
    PushNotification.localNotificationSchedule({
      channelId: "default-channel",
      title: "월간 성과보고서 확인",
      message: `${userName}님의 지난 달 성과보고서를 확인해보세요!`,
      date: getNextMonthlyDate(1, 10), // 매월 1일 10시
      allowWhileIdle: true,
      playSound: true,
      soundName: "default",
    });

    // 주간 성과보고서 알림
    PushNotification.localNotificationSchedule({
      channelId: "default-channel",
      title: "주간 성과보고서 확인",
      message: `${userName}님의 지난 주 성과보고서를 확인해보세요!`,
      date: getNextWeeklyDate(1, 10), // 매주 월요일 10시
      allowWhileIdle: true,
      playSound: true,
      soundName: "default",
    });

    // 데일리 목표 알림
    if (dailySteps >= DAILY_GOAL) {
      PushNotification.localNotification({
        channelId: "default-channel",
        title: "만보기 데일리 목표 달성",
        message: "오늘 목표 걸음 수를 달성했어요. 리워드를 획득하세요!",
        allowWhileIdle: true,
        playSound: true,
        soundName: "default",
      });
    }

    // 주간 목표 알림
    if (weeklySteps >= WEEKLY_GOAL) {
      PushNotification.localNotification({
        channelId: "default-channel",
        title: "만보기 주간 목표 달성",
        message: "이번 주 목표 걸음 수를 달성했어요. 리워드를 획득하세요!",
        allowWhileIdle: true,
        playSound: true,
        soundName: "default",
      });
    }

    // 오늘의 퀘스트 알림
    PushNotification.localNotificationSchedule({
      channelId: "default-channel",
      title: "오늘의 퀘스트",
      message: "오늘의 친환경 활동을 할 시간이에요!",
      date: getTodayAt(18), // 매일 18시
      allowWhileIdle: true,
      playSound: true,
      soundName: "default",
    });

    // 오늘의 퀴즈 알림
    PushNotification.localNotificationSchedule({
      channelId: "default-channel",
      title: "오늘의 퀴즈",
      message: "오늘의 퀴즈를 풀어 리워드를 획득하세요!",
      date: getTodayAt(20), // 매일 20시
      allowWhileIdle: true,
      playSound: true,
      soundName: "default",
    });
  };

  const getNextMonthlyDate = (day, hour) => {
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth(), day, hour);
    if (now > target) {
      target.setMonth(target.getMonth() + 1);
    }
    return target;
  };

  const getNextWeeklyDate = (dayOfWeek, hour) => {
    const now = new Date();
    const target = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + ((dayOfWeek - now.getDay() + 7) % 7),
      hour
    );
    return target;
  };

  const getTodayAt = (hour) => {
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour);
    if (now > target) {
      target.setDate(target.getDate() + 1);
    }
    return target;
  };

  return (
    <View style={styles.container}>
      <MainHeader />

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
          <TouchableOpacity onPress={goToAlarmScreen} style={styles.buttonContainer}>
            <Text style={styles.boxText}>알림 히스토리</Text>
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
          <TouchableOpacity onPress={goToPasswordChangeScreen} style={styles.buttonContainer}>
            <Text style={styles.boxText}>비밀번호 변경하기</Text>
            <Image
              source={require('../../img/My/arrowright.png')}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        </View>

        {/* 로그아웃 */}
        <View style={styles.box}>
          <TouchableOpacity onPress={openLogoutModal} style={styles.buttonContainer}>
            <Text style={styles.boxText}>로그아웃</Text>
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
          <TouchableOpacity onPress={goToWithdrawalScreen} style={styles.buttonContainer}>
            <Text style={styles.boxText}>탈퇴하기</Text>
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
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 32,
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
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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

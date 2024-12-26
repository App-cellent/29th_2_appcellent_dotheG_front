import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

function MyScreen(): React.JSX.Element {
  const [alarmEnabled, setAlarmEnabled] = useState(true);

  const toggleAlarm = () => {
    setAlarmEnabled(!alarmEnabled);
  };

  const [userName, setUserName] = useState("앱설런트");
  const [userId, setUserId] = useState("Appcellent123");

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
        <TouchableOpacity style={styles.nicknameButton}>
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
          <TouchableOpacity>
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
                  : require('../../img/My/pushalarmon.png')
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
          <TouchableOpacity>
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
          <TouchableOpacity>
            <Image
              source={require('../../img/My/arrowright.png')}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        </View>
      </View>
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
});

export default MyScreen;

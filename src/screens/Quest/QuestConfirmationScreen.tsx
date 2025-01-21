import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'react-native-linear-gradient';
import axios from "axios";
import { REACT_APP_API_URL, ACCESS_TOKEN } from '@env';

const QuestConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoPath } = route.params;
  const screenWidth = Dimensions.get('window').width;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');
  //const [selectedQuest, setSelectedQuest] = useState(null);
  const [selectedQuest, setSelectedQuest] = useState(1);
  const [dailyConfirmCount, setDailyConfirmCount] = useState(0);

  const quests = [
      { id: 1, title: '텀블러 사용', reward: 2 },
      { id: 2, title: '자전거 이용', reward: 2 },
      { id: 3, title: '쓰레기 분리배출', reward: 2 },
      { id: 4, title: '에코백 사용', reward: 2 },
      { id: 5, title: '잔반 남기지 않기', reward: 2 },
      { id: 11, title: '플로깅/줍깅', reward: 5 },
      { id: 12, title: '친환경 브랜드 이용', reward: 5 },
      { id: 13, title: '제로 웨이스트 샵 방문', reward: 5 },
      { id: 14, title: '반려 식물 키우기', reward: 5 },
  ];
  /*
  const quests = [
    { id: 1, title: '카페에서 텀블러를 사용했어요.', description: '탄소를 10g 절감할 수 있어요.' },
    { id: 2, title: '자전거를 탔어요.', description: '자전거로 2km 이동 시 탄소를 10g 절감할 수 있어요.' },
    { id: 3, title: '분리수거를 했어요.', description: '올바른 분리수거로 탄소를 20g 절감할 수 있어요.' },
  ];

  const handleSelectQuest = (questId) => {
    setSelectedQuest(questId === selectedQuest ? null : questId);
  };

  const handleCompleteQuest = () => {
    if (dailyConfirmCount >= 3) {
      Alert.alert('알림', '오늘의 퀘스트 인증 한도(3회)를 초과했습니다. 내일 다시 시도해주세요.');
      navigation.navigate('Main');
    } else if (selectedQuest === null) {
      Alert.alert('알림', '퀘스트를 선택해주세요.');
      return;
    } else{
      setDailyConfirmCount(dailyConfirmCount + 1);
      Alert.alert('알림', '퀘스트 인증이 완료되었습니다.');
      setSelectedQuest(null);
      navigation.navigate('Main');
    }
  };
  */

  /*
  const handleCompleteQuest = async () => {
    if (dailyConfirmCount >= 3) {
      Alert.alert('알림', '오늘의 퀘스트 인증 한도(3회)를 초과했습니다. 내일 다시 시도해주세요.');
      navigation.navigate('Main');
    } else if (selectedQuest === null) {
      Alert.alert('알림', '퀘스트를 선택해주세요.');
      return;
    } else {
      try {
        // 이미지 업로드 및 퀘스트 인증
        await uploadPhotoToBackend(photoPath);  // 이미지 업로드

        // 인증 카운트 업데이트
        setDailyConfirmCount(dailyConfirmCount + 1);
        Alert.alert('알림', '퀘스트 인증이 완료되었습니다.');
        setSelectedQuest(null);  // 인증 후 선택된 퀘스트 초기화
        navigation.navigate('Main');  // 메인 화면으로 이동
      } catch (error) {
        console.error('퀘스트 인증 중 오류가 발생했습니다.', error);
        Alert.alert('알림', '퀘스트 인증에 실패했습니다.');
      }
    }
  };

  // 이미지 업로드 함수
  const uploadPhotoToBackend = (photoPath) => {
    const formData = new FormData();
    const token = ACCESS_TOKEN;

    formData.append('photo', {
      uri: photoPath,  // 로컬 파일 경로
      type: 'image/jpeg',  // 파일 타입 (JPEG 형식으로 가정)
      name: 'questPhoto.jpg',  // 파일 이름
    });

    return axios.post(`${REACT_APP_API_URL}/upload/certification`, formData, {
      headers: {
        access: token, // 토큰 포함
      },
    })
    .then(response => {
      console.log('파일 업로드 성공:', response.data);
      // 응답에서 activityId(data)를 가져옴
      const questId = response.data.data;

      if (response.data.success) {
        // 응답에서 받은 questId로 퀘스트를 선택
        setSelectedQuest(questId); // 해당 퀘스트를 선택 상태로 설정
        return true;  // 업로드 성공 시 true 반환
      } else {
        throw new Error('업로드 실패');
      }
    })
    .catch(error => {
      console.error('파일 업로드 실패:', error);
      throw error;  // 오류 발생 시 예외 처리
    });
  };
  */

  const handleCompleteQuest = async () => {
    const formData = new FormData();
    const token = ACCESS_TOKEN;

    formData.append('photo', {
      uri: photoPath,  // 로컬 파일 경로
      type: 'file',  // 파일 타입
      name: 'activityImage',  // 파일 이름
    });

    if (dailyConfirmCount >= 3) {
      Alert.alert('알림', '오늘의 퀘스트 인증 한도(3회)를 초과했습니다. 내일 다시 시도해주세요.');
      navigation.navigate('Main');
    } else if (selectedQuest === null) {
      Alert.alert('알림', '퀘스트를 선택해주세요.');
      return;
    } else {
      try {
        // 백엔드로 퀘스트 인증 요청 보내기
        const response = await fetch(`${REACT_APP_API_URL}/upload/certification`, {
          method: 'POST',
          headers: {
            access: token,
          },
          body: formData,
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // 인증 성공 처리
          setDailyConfirmCount(dailyConfirmCount + 1);
          Alert.alert('알림', '퀘스트 인증이 완료되었습니다.');
          setSelectedQuest(null); // 인증 후 선택된 퀘스트 초기화
          navigation.navigate('Main'); // 메인 화면으로 이동
        } else {
          // 다양한 실패 케이스 처리
          switch (response.status) {
            case 404:
              if (result.message === '유저를 찾을 수 없습니다.') {
                Alert.alert('알림', '유저를 찾을 수 없습니다. 다시 시도해주세요.');
              } else if (result.message === '해당 활동이 등록되어있지 않습니다.') {
                Alert.alert('알림', '해당 활동이 등록되어있지 않습니다.');
              }
              break;
            case 422:
              if (result.message === '이미지 처리에 실패했습니다.') {
                Alert.alert('알림', '이미지 처리에 실패했습니다. 다시 시도해주세요.');
              }
              break;
            default:
              Alert.alert('알림', '퀘스트 인증에 실패했습니다. 나중에 다시 시도해주세요.');
          }
        }
      } catch (error) {
        console.error('퀘스트 인증 중 오류가 발생했습니다.', error);
        Alert.alert('알림', '퀘스트 인증 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };


  const dynamicStyles = StyleSheet.create({
    photo: {
      width: screenWidth,
      height: screenWidth,
      resizeMode: 'cover',
      marginTop: 20,
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../img/Quest/simpleexit.png')} style={styles.exitIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.dateText}>{`${year}년 ${month}월 ${date}일`}</Text>
      <Text style={styles.title}>오늘의 퀘스트 인증완료!</Text>

      {/* 촬영된 사진 */}
      <View style={styles.photoContainer}>
        <Image source={{ uri: `file://${photoPath}` }} style={dynamicStyles.photo} />
        <Image
          source={require('../../img/Quest/bigchecked.png')}
          style={styles.checkboxCenter}
        />
      </View>

      {/* 퀘스트 목록 */}
      <ScrollView style={styles.scrollView}>
        {quests.map((quest) => (
          <View
            key={quest.id}
            style={[
              styles.questButton,
              selectedQuest === quest.id && styles.selectedQuestButton,
            ]}
          >
            <Image
              source={
                selectedQuest === quest.id
                  ? require('../../img/Quest/smallchecked.png')
                  : require('../../img/Quest/smallunchecked.png')
              }
              style={styles.checkbox}
            />
            <View style={styles.questTextContainer}>
              <Text style={styles.questTitle}>{quest.title}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 퀘스트 인증하기 버튼 */}
      <TouchableOpacity style={styles.completeButtonContainer} onPress={handleCompleteQuest}>
        <LinearGradient
          colors={['#9BC9FE', '#69E6A2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.completeButton}
        >
          <Text style={styles.completeButtonText}>퀘스트 인증하기</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  exitButton: {
    alignItems: 'center',
  },
  exitIcon: {
    width: 16.32,
    height: 16.35,
    resizeMode: 'contain',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#69E6A2',
    marginTop: 50,
    marginLeft: 22,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#121212',
    marginTop: 10,
    marginLeft: 22,
  },
  photoContainer: {
    position: 'relative',
  },
  checkboxCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -40 }],
    width: 80,
    height: 80,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  questButton: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#C9C9C9',
    height: 68,
    alignItems: 'center',
  },
  selectedQuestButton: {
    borderColor: '#69E6A2',
  },
  checkbox: {
    //position: 'absolute',
    width: 16,
    height: 16,
    //marginRight: 7.65,
    marginLeft: 18,
    //marginTop: 24,
  },
  questTextContainer: {
    flex: 1,
    marginLeft: 7.65,
    justifyContent: 'center',
  },
  questTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#545454',
  },
  questDescription: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#C9C9C9',
  },
  completeButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  completeButton: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuestConfirmationScreen;

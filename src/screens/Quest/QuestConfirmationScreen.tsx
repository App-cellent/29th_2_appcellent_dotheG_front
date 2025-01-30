import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const apiUrl = process.env.REACT_APP_API_URL;

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

  const handleCompleteQuest = async () => {
    const formData = new FormData();
    const correctedPhotoPath = `file://${photoPath}`;

    formData.append('activityImage', {
      uri: correctedPhotoPath,
      type: 'image/jpeg',
      name: 'activityImage.jpg',
    });

    if (dailyConfirmCount >= 3) {
      Alert.alert('알림', '오늘의 퀘스트 인증 한도(3회)를 초과했습니다. 내일 다시 시도해주세요.');
      navigation.navigate('Main');
      return;
    }

    if (!selectedQuest) {
      Alert.alert('알림', '퀘스트를 선택해주세요.');
      return;
    }

    try {
      console.log('FormData:', formData);
      console.log('Corrected Photo Path:', correctedPhotoPath);

      const accessToken = await AsyncStorage.getItem('token');
      console.log('Access Token:', accessToken);

      const response = await fetch(`${apiUrl}/upload/certification?timestamp=${new Date().getTime()}`, {
        method: 'POST',
        headers: {
          "Cache-Control": 'no-store',
          access: `${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        console.warn('Token expired, refreshing token...');
        const newToken = await refreshToken();
        if (newToken) {
          await AsyncStorage.setItem('token', newToken);
          return handleCompleteQuest(); // 갱신된 토큰으로 재요청
        } else {
          throw new Error('Failed to refresh token');
        }
      }

      const responseText = await response.text();
      console.log('Response Text:', responseText);
      const result = JSON.parse(responseText);

      if (response.ok && result.success) {
        setDailyConfirmCount(dailyConfirmCount + 1);
        Alert.alert('알림', '퀘스트 인증이 완료되었습니다.');
        setSelectedQuest(null);
        navigation.navigate('QuestViewScreen');
      } else {
        Alert.alert('알림', result.message || '퀘스트 인증에 실패했습니다.');
      }
    } catch (error) {
      console.error('퀘스트 인증 중 오류:', error);
      Alert.alert('알림', '퀘스트 인증 중 오류가 발생했습니다. 다시 시도해주세요.');
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

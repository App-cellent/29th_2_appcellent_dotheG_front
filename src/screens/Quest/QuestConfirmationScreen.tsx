import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuestList from "../../utils/QuestList";

const { width, height } = Dimensions.get('window');

const QuestConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoPath } = route.params;
  const screenWidth = Dimensions.get('window').width;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');
  const [selectedQuest, setSelectedQuest] = useState(1); // 기본 선택 퀘스트 ID
  const [dailyConfirmCount, setDailyConfirmCount] = useState(0);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleCompleteQuest = async () => {
    const formData = new FormData();
    const correctedPhotoPath = `file://${photoPath}`;

    formData.append('activityImage', {
      uri: correctedPhotoPath,
      type: 'image/jpeg',
      name: 'activityImage.jpg',
    });
    formData.append('activityId', selectedQuest);

    if (dailyConfirmCount >= 3) {
      Alert.alert('알림', '오늘의 퀘스트 인증 한도(3회)를 초과했습니다. 내일 다시 시도해주세요.');
      navigation.navigate('Main');
      return;
    }

    navigation.navigate('QuestLoadingScreen', { formData });
  };

  const dynamicStyles = StyleSheet.create({
    photo: {
      width: width,
      height: width,
      resizeMode: 'cover',
      marginTop: 10,
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../img/Quest/simpleexit.png')} style={styles.exitIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.greenText}>오늘의 퀘스트 분석 중...</Text>
      <Text style={styles.title}>인증할 퀘스트를 선택하세요</Text>

      {/* 촬영된 사진 */}
      <View style={styles.photoContainer}>
        <Image source={{ uri: `file://${photoPath}` }} style={dynamicStyles.photo} />
      </View>

      {/* 퀘스트 목록 */}
      <ScrollView style={styles.scrollView}>
        {QuestList.map((quest) => {
          const isDisabled = [3, 12, 13].includes(quest.activityId);
          return (
            <TouchableOpacity
              key={quest.activityId}
              style={[
                styles.questButton,
                selectedQuest === quest.activityId && styles.selectedQuestButton,
              ]}
              onPress={() => {
                if (!isDisabled) {
                  setSelectedQuest(quest.activityId);
                }
              }}
              disabled={isDisabled} // 선택 불가능하도록 설정
            >
              <Image
                source={
                  selectedQuest === quest.activityId
                    ? require('../../img/Quest/smallchecked.png')
                    : require('../../img/Quest/smallunchecked.png')
                }
                style={styles.checkbox}
              />
              <View style={styles.questTextContainer}>
                <Text style={styles.questTitle}>{quest.Description}</Text>
                <Text style={styles.questDescription}>{isDisabled ? "분석 준비 중입니다" : "더 많은 활동을 인증해서 탄소를 절감해보세요!"}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
  greenText: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#69E6A2',
    marginTop: 54,
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
    width: width,
    height: width,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 20,
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
    width: 16,
    height: 16,
    marginLeft: 18,
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

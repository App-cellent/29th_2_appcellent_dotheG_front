import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'react-native-linear-gradient';

const QuestConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoPath } = route.params;
  const screenWidth = Dimensions.get('window').width;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');
  const [selectedQuest, setSelectedQuest] = useState(null);

  const quests = [
    { id: 1, title: '카페에서 텀블러를 사용했어요.', description: '탄소를 10g 절감할 수 있어요.' },
    { id: 2, title: '자전거를 탔어요.', description: '자전거로 2km 이동 시 탄소를 10g 절감할 수 있어요.' },
    { id: 3, title: '분리수거를 했어요.', description: '올바른 분리수거로 탄소를 20g 절감할 수 있어요.' },
  ];

  const handleSelectQuest = (questId) => {
    setSelectedQuest(questId === selectedQuest ? null : questId);
  };

  const handleCompleteQuest = () => {
    console.log('Quest completed!');
    navigation.navigate('Main');
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
          <TouchableOpacity
            key={quest.id}
            style={[
              styles.questButton,
              selectedQuest === quest.id && styles.selectedQuestButton,
            ]}
            onPress={() => handleSelectQuest(quest.id)}
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
              <Text style={styles.questDescription}>{quest.description}</Text>
            </View>
          </TouchableOpacity>
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
    marginTop: 70,
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
  },
  selectedQuestButton: {
    borderColor: '#69E6A2',
  },
  checkbox: {
    position: 'absolute',
    width: 16,
    height: 16,
    marginRight: 7.65,
    marginLeft: 18,
    marginTop: 17,
  },
  questTextContainer: {
    flex: 1,
    marginLeft: 40,
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

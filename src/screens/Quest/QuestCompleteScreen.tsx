import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
  Dimensions, ScrollView, Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFontSize } from '../../utils/fontUtils';
import QuestList from "../../utils/QuestList";
import Complete from '../../img/Home/QuestView/complete.svg';

const { width } = Dimensions.get('window');

const QuestCompleteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const formData = route.params?.formData;

  const [selectedQuest, setSelectedQuest] = useState(null);
  const [activityImage, setActivityImage] = useState(null);
  const [activityId, setActivityId] = useState(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    if (formData && formData._parts) {
      const formDataObj = formData._parts.reduce((obj, [key, value]) => {
        if (typeof value === 'object' && value !== null) {
          obj[key] = value.uri || value;
        } else {
          obj[key] = value;
        }
        return obj;
      }, {});

      console.log("Converted formData:", formDataObj);

      const id = formDataObj.activityId;
      const image = formDataObj.activityImage;

      setActivityId(id);
      setActivityImage(image);

      const questInfo = QuestList.find(quest => quest.activityId === parseInt(id));
      setSelectedQuest(questInfo);
    }
  }, [formData]);

  const formatImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('file://')) {
      return imagePath;
    }
    if (imagePath.startsWith('data:image')) {
      return imagePath;
    }
    if (/^[A-Za-z0-9+/=]+$/.test(imagePath)) {
      return `data:image/jpeg;base64,${imagePath}`;
    }
    return imagePath;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../img/Quest/simpleexit.png')} style={styles.exitIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.greenText}>{formattedDate}</Text>
      <Text style={styles.title}>오늘의 퀘스트 인증완료!</Text>

      {/* 촬영된 사진 */}
      <View style={styles.photoContainer}>
        {activityImage && (
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: formatImageUrl(activityImage) }}
                style={styles.photo}
                resizeMode="cover"
              />
            <Image source={require('../../img/Quest/smallchecked.png')} style={styles.checkbox} />
          </View>
        )}
        <View style={styles.questButton}>
          <Text style={styles.questTitle}>{selectedQuest.Description}</Text>
          <Text style={styles.questDescription}>더 많은 활동을 인증해서 탄소를 절감해보세요!</Text> {/* Description 출력 */}
        </View>

        <View style={styles.rowContainer}>
          <Complete width={82} height={24} />
          <Text style={styles.DateText}>{formattedDate}</Text>
        </View>
      </View>

      {/* 퀘스트 인증 완료 버튼 */}
      <TouchableOpacity style={styles.completeButtonContainer} onPress={() => navigation.navigate('QuestViewScreen')}>
        <LinearGradient
          colors={['#9BC9FE', '#69E6A2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.completeButton}
        >
          <Text style={styles.completeButtonText}>퀘스트 인증 완료하기</Text>
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
    zIndex: 1,
  },
  exitButton: {
    padding: 8,
  },
  exitIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  greenText: {
    fontSize: 16,
    fontWeight: '600',
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
    marginBottom: 20,
  },
  photoContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  photo: {
    width: width - 32,
    height: width - 32,
    borderRadius: 10,
    marginBottom: 16,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#545454',
    marginTop: 12,
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  questTextContainer: {
    paddingHorizontal: 22,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
  },
  questTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#545454',
    marginBottom: 4,
  },
  questDescription: {
    fontSize: 12,
    fontWeight: '500',
    color: '#C9C9C9',
  },
  completeButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
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
  DateText: {
    color: '#545454',
    fontSize: getFontSize(15),
    fontWeight: '400',
    lineHeight: 34,
    marginLeft: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default QuestCompleteScreen;

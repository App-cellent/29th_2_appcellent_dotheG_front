import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { LinearGradient } from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
function Tutorial(): React.JSX.Element {
    const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const apiUrl = process.env.REACT_APP_API_URL;

  const steps = [
    require('../../img/User/step1.png'),
    require('../../img/User/step2.png'),
    require('../../img/User/step3.png'),
    require('../../img/User/step4.png'),
  ];

  const handlePress = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goCharacterScreen = () => {
      const fetchTutorialData = async () => {
          try {
              const accessToken = await AsyncStorage.getItem('token');
              const response = await fetch(`${apiUrl}/mainpage/tutorial`, {
                  method: 'POST',
                  headers: {
                      "Cache-Control": 'no-store',
                      "Content-Type": "application/json",
                      access: `${accessToken}`,
                  },
              });

              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }

              const result = await response.json();

              if (result.success) {
                  console.log(result);
                  navigation.navigate('Main', {
                        screen: 'Character',
                  });
              } else {
                  console.error(result.message);
              }
          } catch (error) {
              console.error('Error fetching tutorial POST:', error);
          }
      };
      fetchTutorialData();
  };

  return (
    <View style={styles.container}>
        { currentStep < steps.length && (
            <TouchableOpacity onPress={handlePress} style={styles.imageContainer}>
                <Image source={steps[currentStep - 1]} style={styles.image} resizeMode="contain" />
              </TouchableOpacity>
        )}
        { currentStep === steps.length && (
            <View style={styles.imageContainer}>
                <Image source={steps[3]} style={styles.image} resizeMode="contain" />
                <TouchableOpacity
                    style={styles.BtnContainer}
                    onPress={goCharacterScreen}
                >
                    <LinearGradient
                        colors={['#9BC9FE', '#69E6A2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.completeButton}
                    >
                        <Text style={styles.completeButtonText}>캐릭터 페이지로 이동하기</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
  imageContainer: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height,
  },
  BtnContainer: {
      width: width - 64,
      height: 56,
      position: 'absolute',
      bottom: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
  },
  completeButton: {
      height: '100%',
      width: '100%',
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

export default Tutorial;

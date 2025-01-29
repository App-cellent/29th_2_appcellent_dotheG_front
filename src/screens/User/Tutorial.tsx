import React, { useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

interface TutorialProps {
  navigation: StackNavigationProp<any>;
}

const { width, height } = Dimensions.get('window');
const Tutorial: React.FC<TutorialProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    require('../../img/User/step1.png'),
    require('../../img/User/step2.png'),
    require('../../img/User/step3.png'),
    require('../../img/User/step4.png'),
  ];

  const handlePress = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Main');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.imageContainer}>
        <Image source={steps[currentStep - 1]} style={styles.image} resizeMode="contain" />

      </TouchableOpacity>
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
});

export default Tutorial;

import React from "react";
import LinearGradient from 'react-native-linear-gradient';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

interface GradientButtonProps {
  height?: number; // 버튼 높이
  width?: number;  // 버튼 너비
  text: string;    // 버튼 안에 들어갈 텍스트
  isDisabled: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({ height = 56, width = 328, text, isDisabled = false }) => {
    const buttonTextColor = isDisabled ? '#C9C9C9' : '#ffffff';
    const buttonBackgroundColor = isDisabled ? ['#D3D3D3', '#D3D3D3'] : ['#9BC9FE', '#69E6A2'];

    const handlePress = () => {
        alert("버튼이 클릭되었습니다!");
      };

    return (
    <TouchableOpacity
        onPress={handlePress}
        disabled={isDisabled}
        style={[styles.button, isDisabled && styles.disabledButton]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={buttonBackgroundColor}
          style={[styles.linearGradient, {height, width}]}
          >
          <Text style={[styles.buttonText, { color: buttonTextColor }]}>
            {text}
          </Text>
        </LinearGradient>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.5,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 700,
    backgroundColor: 'transparent',
  },
});

export default GradientButton;
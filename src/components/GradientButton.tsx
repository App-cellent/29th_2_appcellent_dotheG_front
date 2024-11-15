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
}

const GradientButton: React.FC<GradientButtonProps> = ({ height = 56, width = 328, text }) => {
    const handlePress = () => {
        alert("버튼이 클릭되었습니다!");
      };
    return (
    <TouchableOpacity onPress={handlePress}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#9BC9FE', '#69E6A2']}
          style={[styles.linearGradient, {height, width}]}
          >
          <Text style={styles.buttonText}>
            {text}
          </Text>
        </LinearGradient>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default GradientButton;
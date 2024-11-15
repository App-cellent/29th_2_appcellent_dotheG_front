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

function GradientButton(): React.JSX.Element {
    return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#9BC9FE', '#69E6A2']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>
            제출하기
          </Text>
        </LinearGradient>
    );
};

var styles = StyleSheet.create({
  linearGradient: {
    height: 56,
    width: 328,
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
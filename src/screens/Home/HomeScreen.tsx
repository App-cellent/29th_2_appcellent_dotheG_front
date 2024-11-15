import * as React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import GradientButton from "../../components/GradientButton";

function HomeScreen(): React.JSX.Element {
    return (
        <View>
            <Text>HomeScreen</Text>
            <GradientButton />
        </View>
    );
}

export default HomeScreen;
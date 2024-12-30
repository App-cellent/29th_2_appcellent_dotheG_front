import * as React from 'react'

import MainHeader from '../../components/MainHeader';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

function PedometerScreen(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <MainHeader />
            <Text>PedometerScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})

export default PedometerScreen;
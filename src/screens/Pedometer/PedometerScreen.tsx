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

function PedometerScreen(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text>PedometerScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 16,
    }
})

export default PedometerScreen;
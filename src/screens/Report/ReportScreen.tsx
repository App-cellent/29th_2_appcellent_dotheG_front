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

function ReportScreen(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text>ReportScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 16,
    }
})

export default ReportScreen;
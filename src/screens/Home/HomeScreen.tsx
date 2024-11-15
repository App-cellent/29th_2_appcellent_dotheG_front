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

function HomeScreen(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 16,
    }
})

export default HomeScreen;
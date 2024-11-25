import * as React from 'react'
import colors from "../../colors/colors";

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
            <Text style={styles.titleText}>HomeScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 16,
    },
    titleText:{
        fontSize: 24,
        color: colors.green,
    }
})

export default HomeScreen;
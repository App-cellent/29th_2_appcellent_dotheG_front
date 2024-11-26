import * as React from 'react'
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PixelRatio,
} from 'react-native';

function HomeScreen(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={[styles.titleText, {fontSize: getFontSize(23)}]}>HomeScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 1,
        flex: 1,
        paddingHorizontal: 16,
    },
    titleText:{
        color: colors.green,
    }
})

export default HomeScreen;
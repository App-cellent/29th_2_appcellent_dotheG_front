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

function CharacterScreen(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text>CharacterScreen</Text>
            <GradientButton height={64} width={280} text="캐릭터 뽑기" isDisabled={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 16,
    }
})

export default CharacterScreen;
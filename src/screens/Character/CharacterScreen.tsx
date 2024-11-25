import * as React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import GradientButton from "../../components/GradientButton";

function CharacterScreen(): React.JSX.Element {
    const handlePress = () => {
        console.log("버튼이 클릭되었오");
    };

    return (
        <View style={styles.container}>
            <Text>CharacterScreen</Text>
            <GradientButton height={64} width={280} text="캐릭터 뽑기" onPress={handlePress}/>
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
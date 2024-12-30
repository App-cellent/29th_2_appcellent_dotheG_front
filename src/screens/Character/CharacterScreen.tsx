import * as React from 'react'

import GradientButton from "../../components/GradientButton";
import MainHeader from '../../components/MainHeader';

import { useNavigation } from '@react-navigation/native';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';
import LinearGradient from 'react-native-linear-gradient';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

function CharacterScreen(): React.JSX.Element {
    const handlePress = () => {
        console.log("버튼이 클릭되었오");
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(155, 201, 254, 0.4)', 'rgba(105, 230, 162, 0.4)']}
                style={styles.container}
            >
            <View style={styles.header}>
                  <Image
                    source={require('../../img/My/arrowleft.png')}
                  />
                  <Text style={styles.headerText}>내 캐릭터</Text>
                  <Image
                    source={require('../../img/Character/book.png')}
                    style={styles.closeIcon}
                   />
            </View>

            <Text>CharacterScreen</Text>
            <GradientButton height={64} width={280} text="캐릭터 뽑기" onPress={handlePress}/>

            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        height: 56,
    },
    headerText: {
        color: colors.black,
        fontSize: getFontSize(20),
        fontWeight: '800',
        lineHeight: 34,
    },
})

export default CharacterScreen;
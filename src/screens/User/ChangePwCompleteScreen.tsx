import * as React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

function ChangePwCompleteScreen(): React.JSX.Element {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <ImageBackground
                source={require('../../img/User/circleGreen.png')}
                style={styles.background}
            >
                <Text style={styles.text}>비밀번호가 변경되었어요 :)</Text>
                <Text style={styles.smallText}>다시 로그인 화면으로 돌아갑니다.</Text>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: 334,
        height: 334,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: '#121212',
        fontSize: 24,
        fontWeight: 700,
        textAlign: 'center',
        lineHeight: 34,
    },
    smallText: {
        color: '#545454',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 34,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    },
})

export default ChangePwCompleteScreen;
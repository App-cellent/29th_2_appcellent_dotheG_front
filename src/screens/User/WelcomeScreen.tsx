import * as React from 'react'
import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

function WelcomeScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const route = useRoute();
    const { nickname } = route.params || {};
    
    useEffect(() => {
        const loading = setTimeout(() => {
            navigation.navigate('LoginScreen');
        }, 2000);
    
        return () => clearTimeout(loading);
    }, [navigation]);
    
    return(
        <View style={styles.container}>
            <ImageBackground
                source={require('../../img/User/circleBlue.png')}
                style={styles.background}
            >
                <Text style={styles.text}>
                    <Text style={styles.userName}>{nickname || '사용자'}</Text>
                    {' 님, 환영해요 :)'}
                </Text>
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
        width: 302,
        height: 302,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: '#121212',
        fontSize: 24,
        fontWeight: 700,
        textAlign: 'center',
    },
    userName: {
        color: '#69E6A2',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    },
})

export default WelcomeScreen;
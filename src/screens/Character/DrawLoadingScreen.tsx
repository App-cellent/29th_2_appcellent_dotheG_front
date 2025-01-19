import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function DrawLoadingScreen(): React.JSX.Element {
    const navigation = useNavigation();

    useEffect(() => {
        const loading = setTimeout(() => {
            navigation.navigate('DrawResultScreen');
        }, 1000);

        return () => clearTimeout(loading);
    }, [navigation]);

    return(
        <View style={styles.container}>
            <ImageBackground
                source={require('../../img/Character/circleGradient.png')}
                style={styles.background}
            >
                <Text style={styles.text}>새로운 캐릭터를</Text>
                <Text style={styles.text}>뽑는 중이에요!</Text>
                <Text style={styles.smallText}>두근두근...</Text>
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
        fontSize: 23,
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: 4,
    },
    smallText: {
        color: '#545454',
        fontSize: 16,
        fontWeight: 500,
        marginTop: 14,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    },
})

export default DrawLoadingScreen;
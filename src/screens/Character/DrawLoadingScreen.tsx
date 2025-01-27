import * as React from 'react';
import { useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

type RootStackParamList = {
    DrawResultScreen: { characterData: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DrawResultScreen'>;
type RoutePropType = RouteProp<RootStackParamList, 'DrawResultScreen'>;

function DrawLoadingScreen(): React.JSX.Element {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RoutePropType>();
    
    const characterData = route.params?.characterData;

    useEffect(() => {
        const loading = setTimeout(() => {
            navigation.navigate('DrawResultScreen', { characterData });
        }, 1000);

        return () => clearTimeout(loading);
    }, [navigation, characterData]);

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
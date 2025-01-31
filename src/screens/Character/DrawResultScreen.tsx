import * as React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableWithoutFeedback
} from 'react-native';

import CharacterRarity from '../../components/CharacterRarity';

import AsyncStorage from '@react-native-async-storage/async-storage';

type DrawResultParams = {
    characterData: {
        characterId: number;
        characterName: string;
        characterRarity: number;
    };
};

function DrawResultScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const route = useRoute();
    const { characterData } = route.params as DrawResultParams;
    const { characterId, characterName, characterRarity } = characterData || {};

    const characterImages: { [key: number]: any } = {
        1: require('../../img/Character/Image/1.png'),
        2: require('../../img/Character/Image/2.png'),
        3: require('../../img/Character/Image/3.png'),
        4: require('../../img/Character/Image/4.png'),
        5: require('../../img/Character/Image/5.png'),
        6: require('../../img/Character/Image/6.png'),
        7: require('../../img/Character/Image/7.png'),
        8: require('../../img/Character/Image/8.png'),
        9: require('../../img/Character/Image/9.png'),
        10: require('../../img/Character/Image/10.png'),
        11: require('../../img/Character/Image/11.png'),
        12: require('../../img/Character/Image/12.png'),
        13: require('../../img/Character/Image/13.png'),
        14: require('../../img/Character/Image/14.png'),
        15: require('../../img/Character/Image/15.png'),
        16: require('../../img/Character/Image/16.png'),
        17: require('../../img/Character/Image/17.png'),
        18: require('../../img/Character/Image/18.png'),
        19: require('../../img/Character/Image/19.png'),
    };

    const goToListScreen = async () => {
        if (characterId) {
            await AsyncStorage.setItem('newDrawCharacterId', characterId.toString());
        }

        navigation.navigate("Main", {
            screen: "Character",
            params: { screen: "ListScreen" }
        });
    };

    return(
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={goToListScreen}
            accessible={false}
        >
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../img/Character/circleGradient.png')}
                    style={styles.background}
                >
                    <Text style={styles.text}>
                        <Text style={styles.characterText}>새로운 캐릭터</Text>
                        {'가 나왔어요!'}
                    </Text>
                    <Image
                        source={characterImages[characterId]}
                        style={styles.characterImg}
                        resizeMode="contain"
                    />
                    <Text style={[styles.text, styles.marginBottom9]}>{characterName}</Text>
                    <CharacterRarity rarity={characterRarity} />
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: 384,
        height: 384,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text :{
        fontSize: 23,
        fontWeight: 700,
        textAlign: 'center',
    },
    characterText: {
        color: '#9BC9FE',
    },
    characterImg: {
        width: '50%',
        height: '50%',
        marginTop: 40,
        marginBottom: 20,
    },
    marginBottom9: {
        marginBottom: 9,
    }
})

export default DrawResultScreen;
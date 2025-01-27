import * as React from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

import CharacterRarity from '../../components/CharacterRarity';

type DrawResultParams = {
    characterData: {
        characterName: string;
        characterImageUrl: string;
        characterRarity: number;
    };
};

function DrawResultScreen(): React.JSX.Element {
    const route = useRoute();
    const { characterData } = route.params as DrawResultParams;

    const { characterName, characterImageUrl, characterRarity } = characterData || {};

    return(
        <View style={styles.container}>
            <ImageBackground
                source={require('../../img/Character/circleGradient.png')}
                style={styles.background}
            >
                <Text style={styles.text}>
                    <Text style={styles.characterText}>새로운 캐릭터</Text>
                    {'가 나왔어요!'}
                </Text>
                {characterImageUrl ? (
                    <Image
                        source={{ uri: characterImageUrl }}
                        style={styles.characterImg}
                    />
                ) : (
                    <Image
                        source={require('../../img/Character/nullCharacter.png')}
                        style={styles.characterImg}
                    />
                )}
                <Text style={[styles.text, styles.marginBottom9]}>{characterName}</Text>
                <CharacterRarity rarity={characterRarity} />
            </ImageBackground>
        </View>
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
        width: 210,
        height: 144,
        margin: 46,
    },
    marginBottom9: {
        marginBottom: 9,
    }
})

export default DrawResultScreen;
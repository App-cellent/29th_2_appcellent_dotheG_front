import * as React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Text, StyleSheet } from 'react-native';

interface CharacterRarityLevel {
    rarity: number;
}

const CharacterRarity: React.FC<CharacterRarityLevel> = ({ rarity }) => {
    return (
        <LinearGradient
            colors={['#9BC9FE', '#69E6A2']}
            start={{ x:0, y:0 }}
            end={{ x: 1, y: 0 }}
            style={styles.rarityBackground}
        >
            <Text style={styles.rarityText}>희귀도 {rarity}</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    rarityBackground: {
        display: 'flex',
        borderRadius: 15,
        width: 74,
        height: 29,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rarityText: {
        fontSize: 13,
        fontWeight: 500,
        color: '#121212',
        textAlign: 'center',
        lineHeight: 29,
    },
});

export default CharacterRarity;
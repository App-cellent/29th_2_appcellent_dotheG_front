import * as React from 'react'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    TouchableOpacity,
} from 'react-native';

import GradientButton from '../../components/GradientButton';

function AnimalDrawScreen(): React.JSX.Element {
    const navigation = useNavigation();

    const animals = [
        { id: 1, label: '두더지', fruit: 35 },
        { id: 2, label: '참매', fruit: 20 },
        { id: 3, label: '꿀벌', fruit: 19 },
        { id: 4, label: '수달', fruit: 25 },
    ];

    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    return(
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(155, 201, 254, 0.4)', 'rgba(105, 230, 162, 0.4)']}
                style={styles.container}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.textLarge}>뽑고 싶은 동물을</Text>
                    <Text style={styles.textLarge}>선택해주세요.</Text>
                    <Text style={styles.textSmall}>동물의 희귀도는 랜덤이에요.</Text>
                </View>

                <View style={styles.bodyContainer}>
                    <View style={styles.optionContainer}>
                        {animals.map(option => (
                            <TouchableOpacity
                                key={option.id}
                                onPress={() => setSelectedOption(option.id)}
                            >
                                {selectedOption === option.id ? (
                                    <LinearGradient
                                        colors={['#69E6A2', '#9BC9FE']}
                                        style={styles.selectedGradient}
                                    >
                                        <View style={styles.optionCard}>
                                            <Text style={styles.optionText}>{option.label}</Text>
                                            <View style={styles.fruitContainer}>
                                                <Image 
                                                    source={require('../../img/Character/fruit.png')}
                                                    style={styles.fruitIcon}
                                                />
                                                <Text style={styles.fruitText}>{option.fruit}</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                ) : (
                                    <View style={styles.optionCard}>
                                        <Text style={styles.optionText}>{option.label}</Text>
                                        <View style={styles.fruitContainer}>
                                            <Image 
                                                source={require('../../img/Character/fruit.png')}
                                                style={styles.fruitIcon}
                                            />
                                            <Text style={styles.fruitText}>{option.fruit}</Text>
                                        </View>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.buttonContainer}>
                        <GradientButton
                            height={56} width={350} text="다음"
                            onPress={() => navigation.navigate('DrawLoadingScreen')}
                        />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        marginLeft: 31,
        marginTop: 50,
        marginBottom: 12,
    },
    textLarge: {
        color: '#121212',
        fontSize: 23,
        fontWeight: 700,
        lineHeight: 33,
        marginBottom: 2,
    },
    textSmall: {
        color: '#545454',
        fontSize: 15,
        fontWeight: 400,
        lineHeight: 20,
        marginTop: 5,
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
    },
    optionContainer: {
        width: '84%',
        marginLeft: 31,
        marginRight: 31,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    selectedGradient: {
        width: 162,
        height: 162,
        borderRadius: 18,
        padding: 3,
    },
    optionCard: {
        width: 156,
        height: 156,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        marginBottom: 27,
        justifyContent: 'space-between',
    },
    optionText: {
        color: '#545454',
        fontSize: 18,
        fontWeight: '600',
    },
    fruitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    fruitIcon: {
        width: 18,
        height: 24,
        marginRight: 6,
    },
    fruitText: {
        color: '#121212',
        fontSize: 18,
        fontWeight: '700',
    },
    buttonContainer: {
        marginTop: 'auto',
        marginBottom: 70,
    },
})

export default AnimalDrawScreen;
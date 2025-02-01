import * as React from 'react'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';

import GradientButton from '../../components/GradientButton';

import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    DrawLoadingScreen: { characterData: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DrawLoadingScreen'>;

function AnimalDrawScreen(): React.JSX.Element {
    const navigation = useNavigation<NavigationProp>();

    const animals = [
        { id: 1, label: '두더지', fruit: 70 },
        { id: 2, label: '참매', fruit: 70 },
        { id: 3, label: '꿀벌', fruit: 70 },
        { id: 4, label: '수달', fruit: 70 },
    ];

    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleNext = async () => {
        if (selectedOption !== null) {
            const selectedAnimal = animals.find(animal => animal.id === selectedOption);
            if (selectedAnimal) {
                try {
                    const accessToken = await AsyncStorage.getItem('token');

                    const response = await fetch(`${apiUrl}/characters/draw`, {
                        method: 'POST',
                        headers: { 
                            "Cache-Control":'no-store',
                            "Content-Type":"application/json",
                            access: `${accessToken}`,
                        },
                        body: JSON.stringify({ 
                            drawType: 'ANIMAL', 
                            animalName: selectedAnimal.label 
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`API 요청 실패: ${response.status}`)
                    }

                    const result = await response.json();
                    if (result.success) {
                        navigation.navigate('DrawLoadingScreen', { characterData: result.data });
                    } else {
                        Alert.alert(result.message || '알 수 없는 오류가 발생했습니다.');
                    }
                } catch (error: unknown) {
                    console.error('API 호출 에러:', error);
                    Alert.alert('데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.');
                }
            }
        } else {
            Alert.alert('동물 옵션을 선택해주세요.');
        }
    };

    return(
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(155, 201, 254, 0.4)', 'rgba(105, 230, 162, 0.4)']}
                style={styles.container}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../img/Character/backIcon.png')}
                        />
                    </TouchableOpacity>
                </View>
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
                            onPress={handleNext}
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
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        height: 56,
    },
    textContainer: {
        marginLeft: 31,
        marginTop: 20,
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
        position: 'absolute',
        bottom: 50,
    },
})

export default AnimalDrawScreen;
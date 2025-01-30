import * as React from 'react';
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
    Modal,
    Alert,
} from 'react-native';

import GradientButton from "../../components/GradientButton";

import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    DrawLoadingScreen: { characterData: any };
    AnimalDrawScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DrawLoadingScreen'>;

function DrawScreen(): React.JSX.Element {
    const navigation = useNavigation<NavigationProp>();

    const options = [
        { id: 1, label: '동물 정해서\n뽑기', modalTitle: '동물 정해서 뽑기', fruit: 35, },
        { id: 2, label: '랜덤 뽑기', modalTitle: '랜덤 캐릭터 뽑기', fruit: 20, },
        { id: 3, label: '희귀도1 뽑기', modalTitle: '희귀도1 캐릭터 뽑기', fruit: 19, },
        { id: 4, label: '희귀도2 뽑기', modalTitle: '희귀도2 캐릭터 뽑기', fruit: 25, },
        { id: 5, label: '희귀도3 뽑기', modalTitle: '희귀도3 캐릭터 뽑기', fruit: 35 },
        { id: 6, label: '희귀도4 뽑기', modalTitle: '희귀도4 캐릭터 뽑기', fruit: 55 },
    ];

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleNext = () => {
        if (selectedOption !== null) {
            setModalVisible(true);
        } else {
            Alert.alert('선택 오류', '옵션을 선택해주세요.');
        }
    };

    // 뽑기 API
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleConfirm = async () => {
        setModalVisible(false);
        const selected = options.find(option => option.id === selectedOption);

        if (selected) {
            let drawType = '';
            let animalName = '';

            if (selected.id === 1) {
                navigation.navigate('AnimalDrawScreen');
                return;
            } else if (selected.id === 2) {
                drawType = 'RANDOM';
            } else if (selected.id === 3) {
                drawType = 'RANK_1';
            } else if (selected.id === 4) {
                drawType = 'RANK_2';
            } else if (selected.id === 5) {
                drawType = 'RANK_3';
            } else if (selected.id === 6) {
                drawType = 'RANK_4';
            }

            try {
                const accessToken = await AsyncStorage.getItem('token');

                const response = await fetch(`${apiUrl}/characters/draw`, {
                    method: 'POST',
                    headers: {
                        "Cache-Control":'no-store',
                        "Content-Type":"application/json",
                        access: `${accessToken}`,
                    },
                    body: JSON.stringify({ drawType, animalName }),
                });

            const result = await response.json();
            if (response.ok) {
                // 성공 응답 처리
                navigation.navigate('DrawLoadingScreen', { characterData: result.data });
            } else {
                // 오류 응답 처리
                Alert.alert(result.message);
            }
        } catch (error) {
            console.error('API 요청 실패:', error);
            Alert.alert('네트워크 오류', '서버와 통신 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
    }
};

    return(
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(155, 201, 254, 0.4)', 'rgba(105, 230, 162, 0.4)']}
                style={styles.container}
            >
                <View style={styles.wrapper}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textLarge}>캐릭터 뽑기 옵션을</Text>
                        <Text style={styles.textLarge}>선택해주세요.</Text>
                        <Text style={styles.textSmall}>희귀도에 따라 열매수가 달라요!</Text>
                    </View>

                    <View style={styles.bodyContainer}>
                        <View style={styles.optionContainer}>
                            {options.map(option => (
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
                </View>

                {/* 캐릭터 뽑기 모달 */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>
                                {selectedOption !== null
                                    ? options.find(option => option.id === selectedOption)?.modalTitle
                                    : ''}
                            </Text>
                            <Text style={styles.modalText}>정말 캐릭터를 뽑으시겠습니까?</Text>
                            <View style={styles.modalButtonContainer}>
                                <GradientButton
                                    height={57} width={267} text="확인"
                                    onPress={handleConfirm}
                                />
                                <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.modalCancelText}>취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 31,
    },
    textContainer: {
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
        alignItems: 'center',
    },
    optionContainer: {
        width: '100%',
        marginLeft: 31,
        marginRight: 31,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
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
    selectedGradient: {
        width: 162,
        height: 162,
        borderRadius: 18,
        padding: 3,
    },
    optionText: {
        color: '#545454',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 30,
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
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        minHeight: 279,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 23,
        fontWeight: '700',
        color: '#121212',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#545454',
        marginBottom: 40,
    },
    modalButtonContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 5,
    },
    modalCancelButton: {
        width: 267,
        height: 57,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCancelText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#C9C9C9',
    },})

export default DrawScreen;
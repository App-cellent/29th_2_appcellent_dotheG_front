import React, { useState } from 'react';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import colors from "../../utils/colors";
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity, 
  ActivityIndicator, 
} from 'react-native';

import CharacterRarity from '../../components/CharacterRarity';
import GradientButton from "../../components/GradientButton";

import AsyncStorage from '@react-native-async-storage/async-storage';

function CharacterScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const route = useRoute();
    const [character, setCharacter] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;
    //const accessToken = process.env.ACCESS_TOKEN;

    const fetchCharacterData = async () => {
        setLoading(true);
        try {
            const accessToken = await AsyncStorage.getItem('token');
            console.log('Access Token:', accessToken);
                
            const response = await fetch(`${apiUrl}/characters/main?timestamp=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    "Cache-Control":'no-store',
                    "Content-Type":"application/json",
                    access: `${accessToken}`,
                },
            });

            // 토큰 갱신
            if (response.status === 401) {
                console.warn('Token expired, refreshing token...');
                const newToken = await refreshToken();
                if (newToken) {
                    accessToken = newToken;
                    await AsyncStorage.setItem('token', newToken);
                    return fetchCharacterData();
                } else {
                    throw new Error('Failed to refresh token');
                }
            }

            // response status
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setCharacter(result.data);
                console.log('Success');
            } else {
                console.error(result.message);
                setCharacter(null);
            }
        } catch (error) {
            console.error('Error fetching character data:', error);
            setCharacter(null);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (route.params?.updatedCharacter) {
                console.log("Success : receive params data", route.params.updatedCharacter);
                setCharacter(route.params.updatedCharacter);
            } else {
                fetchCharacterData();
            }
        }, [apiUrl, route.params])
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
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
                    <Text style={styles.headerText}>내 캐릭터</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ListScreen')}>
                        <Image
                            source={require('../../img/Character/listIcon.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.bodyContainer}>
                    {/* 캐릭터 이미지 */}
                    <Image
                        source={character && character.characterImageUrl 
                            ? { uri: character.characterImageUrl } 
                            : require('../../img/Character/nullCharacter.png')}
                        style={styles.characterImg}
                    />
                    {/* 캐릭터 이름 */}
                    <Text style={styles.characterName}>
                        {character ? character.characterName : 'No Character'}
                    </Text>
                    {/* 캐릭터 희귀도 */}
                    <CharacterRarity rarity={character ? character.characterRarity : null} />
                    <View style={styles.squareContainer}>
                        <View style={styles.leafContainer}>
                            <Image
                                source={require('../../img/Character/apple.png')}
                                style={styles.leafImg}
                            />
                            {/* 남은 리워드 수 */}
                            <Text style={styles.leafNum}>
                                {character ? character.userReward : '0'}
                            </Text>
                        </View>
                        <GradientButton
                            height={64} width={280} text="캐릭터 뽑기"
                            onPress={() => navigation.navigate('DrawScreen')}
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
    headerText: {
        color: colors.black,
        fontSize: 20,
        fontWeight: '800',
        lineHeight: 34,
    },
    bodyContainer: {
        alignItems: 'center',
    },
    characterImg: {
        width: 268,
        height: 184,
        marginTop: 116,
        marginBottom: 40,
    },
    characterName: {
        color: '#121212',
        fontSize: 26,
        fontWeight: 700,
        marginBottom: 10,
        lineHeight: 34,
    },
    squareContainer: {
        width: 330,
        height: 162,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 44,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    leafContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginTop: 15,
        marginBottom: 20,
    },
    leafImg: {
        width: 36,
        height: 36,
    },
    leafNum: {
        fontSize: 20,
        fontWeight: 700,
        color: '#69E6A2',
        lineHeight: 34,
    },
})

export default CharacterScreen;
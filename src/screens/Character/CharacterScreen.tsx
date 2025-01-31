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
  Alert
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

    //로그아웃 테스트
    const handleLogout = async () => {
        try {
          const accessToken = await AsyncStorage.getItem('token');
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          console.log('Access Token:', accessToken);
          console.log('Refresh Token:', refreshToken);
          
          const response = await fetch(`${apiUrl}/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              "Cache-Control":"no-store",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: refreshToken,
            }),
          });
    
          if (response.ok) {
            console.log('Logout Success:', response.status);
            Alert.alert('Success', '로그아웃 성공');

            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('refreshToken');

            navigation.navigate('LoginScreen');
          } else {
            console.error('Logout Failed');
            Alert.alert('Error', `로그아웃 실패: ${response.status}`);
          }
        } catch (error) {
          console.error('Logout Error:', error);
          Alert.alert('Error', '로그아웃 오류 발생');
        }
    };
    //로그아웃 테스트

    const fetchCharacterData = async () => {
        setLoading(true);
        try {
            const accessToken = await AsyncStorage.getItem('token');
            //console.log('Access Token:', accessToken);
                
            const response = await fetch(`${apiUrl}/characters/main?timestamp=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    "Cache-Control":'no-store',
                    "Content-Type":"application/json",
                    access: `${accessToken}`,
                },
            });

            if (response.status === 401) {
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
                console.log("캐릭터 ID:", character?.characterId);
                console.log("캐릭터 Image:", characterImages[Number(character?.characterId)]);
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
                        source={characterImages[character?.characterId]}
                        style={styles.characterImg}
                        resizeMode="center"
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

                {/* 로그아웃 테스트 */}
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={{ textAlign: 'center' }}>로그아웃</Text>
                </TouchableOpacity>
                {/* 로그아웃 테스트 */}
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
        width: 300,
        height: 200,
        marginTop: 110,
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
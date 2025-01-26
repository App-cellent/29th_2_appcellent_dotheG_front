import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop, Line } from 'react-native-svg';
import { 
    StyleSheet, 
    Text, 
    View,  
    Image, 
    TouchableOpacity, 
    FlatList, 
    Modal,
} from 'react-native';

import CharacterRarity from '../../components/CharacterRarity';
import GradientButton from '../../components/GradientButton';

import AsyncStorage from '@react-native-async-storage/async-storage';

// 임시 더미 데이터
const characters = [
    { id: 1, name: '땅에서 갓 튀어나온 두더지', rarity: '흔함', image: require('../../img/Character/mole/[1]mole1.png') },
    { id: 2, name: '비행하는 꿀벌', rarity: '흔함', image: require('../../img/Character/honeybee/[13]honeybee1.png') },
    { id: 3, name: '흙이 부족해 화난 두더지', rarity: '보통', image: require('../../img/Character/mole/[2]mole2.png') },
    { id: 4, name: '꽃에 물주는 꿀벌', rarity: '보통', image: require('../../img/Character/honeybee/[14]honeybee2.png') },
    { id: 5, name: '수줍은 두더지', rarity: '희귀', image: require('../../img/Character/mole/[3]mole3.png') },
    { id: 6, name: '꽃을 떼다 만 꿀벌', rarity: '희귀', image: require('../../img/Character/honeybee/[15]honeybee3.png') },
    { id: 7, name: '삽을 든 두더지', rarity: '매우희귀', image: require('../../img/Character/mole/[4]mole4.png') },
    { id: 8, name: '행복한 꿀벌', rarity: '매우희귀', image: require('../../img/Character/honeybee/[16]honeybee4.png') },
    { id: 9, name: '파란 지구', rarity: '매우희귀', image: require('../../img/Character/bonus/[17]earth.png') },
    { id: 10, name: '네잎클로버', rarity: '매우희귀', image: require('../../img/Character/bonus/[18]clover.png') },
    { id: 11, name: '구름에 가려진 햇빛', rarity: '매우희귀', image: require('../../img/Character/bonus/[19]sun.png') },
];

// 대표 캐릭터 지정 팝업창
interface SecondModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    characterName: string;
}

const SecondModal: React.FC<SecondModalProps> = ({ visible, onConfirm, onCancel, characterName }) => (
    <Modal
        animationType='fade'
        transparent={true}
        visible={visible}
        onRequestClose={onCancel}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.secondModalContainer}>
                <Text style={styles.secondModalTitle}>
                    <Text style={{ color: '#69E6A2' }}>'{characterName}'</Text>가 {"\n"}대표 캐릭터로 지정되었어요!
                </Text>
                <Text style={styles.secondModalText}>
                    이 캐릭터로 선택하시겠습니까?
                </Text>
                <View style={styles.secondModalBtnContainer}>
                    <GradientButton
                        height={57} width={247} text="확인"
                        onPress={onConfirm}
                    />
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={onCancel}
                    >
                        <Text style={styles.cancelButtonText}>취소</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>   
    </Modal>
)

interface Character {
    id: number;
    name: string;
    rarity: string;
    image: string;
}

function ListScreen(): React.JSX.Element {
    const navigation = useNavigation();

    const [selectedTab, setSelectedTab] = useState<keyof typeof tabMapping>('전체보기');
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [secondModalVisible, setSecondModalVisible] = useState(false);
    //const [userId, setUserId] = useState<string | null>(null);

    // 탭 매핑
    const tabMapping = {
        '전체보기': 'ALL',
        '흔함': 'COMMON',
        '보통': 'NORMAL',
        '희귀': 'RARE',
        '매우희귀': 'LEGENDARY',
    };

    // 희귀도 매핑
    const mapRarity = (rarityLevel: number): string => {
        switch (rarityLevel) {
            case 1:
                return '흔함';
            case 2:
                return '보통';
            case 3:
                return '희귀';
            case 4:
                return '매우희귀';
            default:
                return '';
        }
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    // 사용자 ID API 호출
    // const fetchUserId = async () => {
    //     try {
    //         const accessToken = await AsyncStorage.getItem('token');
    //         console.log('Access Token:', accessToken);

    //         //${apiUrl}/characters/main?timestamp=${new Date().getTime()}

    //         const response = await fetch(`${apiUrl}/characters/collection`, {
    //             method: 'GET',
    //             headers: {
    //                 "Cache-Control": 'no-store',
    //                 "Content-Type": "application/json",
    //                 access: `${accessToken}`,
    //             },
    //         });
    //         const result = await response.json();
    //         if (response.ok) {
    //             setUserId(result.userId);
    //         } else {
    //             console.error(result.message);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching userId:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchUserId();
    // }, []);
    
    const fetchCharacterData = async (viewType: string) => {
        //if (!userId) return;
        
        setIsLoading(true);
        try {
            const accessToken = await AsyncStorage.getItem('token');
            const response = await fetch(`${apiUrl}/characters/collection?viewType=${viewType}`, 
                {
                    method: 'GET',
                    headers: {
                        "Cache-Control": 'no-store',
                        "Content-Type": "application/json",
                        access: `${accessToken}`,
                    },
                }
            );

            const result = await response.json();
            console.log('API response:', result);

            if (response.ok && result.success) {
                const mappedData = result.data.map((char: any) => ({
                    id: char.charId,
                    name: char.charName,
                    rarity: char.charRarity,
                    image: { uri: char.charImageUrl },
                }));
                setCharacters(mappedData);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error fetching characters:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacterData(tabMapping[selectedTab]);
    }, [selectedTab]);


    // const sortedCharacters = 
    //     selectedTab === '전체보기'
    //     ? characters
    //     : characters.filter(character => character.rarity === selectedTab);

    // const groupedCharacters = [];
    // for (let i = 0; i < sortedCharacters.length; i += 3) {
    //     groupedCharacters.push(sortedCharacters.slice(i, i + 3));
    // }

    const handleCharacterModal = (id: number) => {
        setSelectedCharacter(id);
        setModalVisible(true);
    };

    const selectedCharacterData = characters.find(
        (character) => character.id === selectedCharacter
    );

    const handleFirstModalConfirm = () => {
        setModalVisible(false);
        setSecondModalVisible(true);
    };

    const handleSecondModalConfirm = () => {
        setSecondModalVisible(false);
        navigation.navigate('CharacterScreen');
    };

    const handleSecondModalCancel = () => {
        setSecondModalVisible(false);
    };

    const getRarityLevel = (rarity: string) => {
        switch (rarity) {
            case '흔함':
                return 1;
            case '보통':
                return 2;
            case '희귀':
                return 3;
            case '매우 희귀':
                return 4;
            default:
                return 0;
        }
    };

    return(
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(155, 201, 254, 0.4)', 'rgba(105, 230, 162, 0.4)']}
                style={styles.container}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('CharacterScreen')}>
                        <Image
                            source={require('../../img/Character/backIcon.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('../../img/Character/listIconGradient.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.textSmall}>지금까지 이만큼 모았어요!</Text>
                    <Text style={styles.textLarge}>캐릭터 도감을 살펴보세요.</Text>
                </View>

                <View style={styles.bodyContainer}>
                    <View style={styles.tabContainer}>
                        {Object.keys(tabMapping).map(tab => (
                            <TouchableOpacity
                                key={tab}
                                style={styles.tab}
                                onPress={() => setSelectedTab(tab as keyof typeof tabMapping)}
                            >
                                <View style={styles.tabInner}>
                                    {selectedTab === tab ? (
                                        <>
                                            <Svg width="54" height="20" viewBox="0 0 54 20">
                                                <Defs>
                                                    <SvgLinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                                                        <Stop offset="0" stopColor="#69E6A2" stopOpacity="1" />
                                                        <Stop offset="1" stopColor="#9BC9FE" stopOpacity="1" />
                                                    </SvgLinearGradient>
                                                </Defs>
                                                <SvgText
                                                    fill="url(#gradient)"
                                                    fontSize="14"
                                                    fontWeight="700"
                                                    x="27"
                                                    y="17"
                                                    textAnchor='middle'
                                                >
                                                    {tab}
                                                </SvgText>
                                            </Svg>
                                            <LinearGradient
                                                colors={['#69E6A2', '#9BC9FE']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                style={styles.selectedTabBar}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Text style={styles.tabText}>{tab}</Text>
                                            <View style={styles.defaultTabBar} />
                                        </>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {isLoading ? (
                        <Text>Loading...</Text>
                    ) : (
                    <FlatList
                        data={characters}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <TouchableOpacity 
                                    key={item.id} 
                                    style={styles.characterBox}
                                    onPress={() => handleCharacterModal(item.id)}
                                >
                                    {selectedCharacter === item.id ? (
                                        <View style={styles.gradientContainer}>
                                            <LinearGradient
                                                colors={['#69E6A2', '#9BC9FE']}
                                                style={styles.selectedGradient}
                                            >
                                                <View style={styles.imageContainer}>
                                                    <Image
                                                        source={item.image}
                                                        style={styles.image}
                                                    />
                                                </View>
                                            </LinearGradient>
                                        </View>
                                    ) : (
                                        <Image
                                            source={item.image}
                                            style={styles.image}
                                        />
                                    )}
                                </TouchableOpacity>
                                {/* 빈 CharacterBox 추가 */}
                                {Array(3 - 1).fill(null).map((_, index) => (
                                    <View key={index} style={styles.emptyBox} />
                                ))}
                            </View>
                        )}
                    />
                    )}
                </View>

                {/* 캐릭터 도감 팝업창 */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                style={styles.closeIcon}
                                onPress={() => setModalVisible(false)}
                            >
                                <Image
                                    source={require('../../img/Character/closeIcon.png')}
                                    style={{ width: 15, height: 15 }}
                                />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>캐릭터 살펴보기</Text>
                            <Text style={styles.modalText}>내가 수집한 캐릭터에요 :)</Text>
                            {selectedCharacterData && (
                                <>
                                    <Image
                                        source={selectedCharacterData.image}
                                        style={styles.characterImg}
                                    />
                                    <Text style={styles.characterName}>
                                        {selectedCharacterData.name}
                                    </Text>
                                    <CharacterRarity rarity={getRarityLevel(selectedCharacterData.rarity)} />
                                    <View style={styles.starContainer}>
                                        {Array.from(
                                            { length: getRarityLevel(selectedCharacterData.rarity) },
                                            (_, index) => (
                                                <Image
                                                    key={index}
                                                    source={require('../../img/Character/star.png')}
                                                    style={styles.starIcon}
                                                />
                                            )
                                        )}
                                    </View>
                                </>
                            )}
                            <GradientButton 
                                height={57} width={256} text="대표 캐릭터로 지정하기"
                                onPress={handleFirstModalConfirm}
                            />
                        </View>
                    </View>
                </Modal>

                {/* 대표 캐릭터 지정 팝업창 */}
                <SecondModal
                    visible={secondModalVisible}
                    characterName={selectedCharacterData?.name || ''}
                    onConfirm={handleSecondModalConfirm}
                    onCancel={handleSecondModalCancel}
                />
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
        marginLeft: 22,
        marginTop: 23,
        marginBottom: 40
    },
    textSmall: {
        color: '#545454',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 34,
    },
    textLarge: {
        color: '#121212',
        fontSize: 25,
        fontWeight: 700,
        lineHeight: 34,
    },
    bodyContainer: {
        flex:1,
        alignItems: 'center',
    },
    tabContainer: {
        width: '91%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 25,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
    },
    selectedTabBar: {
        position: 'absolute',
        bottom: -12,
        width: '100%',
        height: 3.2,
        borderRadius: 2,
        backgroundColor: 'transparent',
    },
    defaultTabBar: {
        position: 'absolute',
        bottom: -12,
        width: '100%',
        height: 1.2,
        backgroundColor: '#9BC9FE',
        alignSelf: 'center',
    },
    tabText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#9B9B9B',
        textAlign: 'center',
    },
    tabInner: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    characterBox: {
        width: 100,
        height: 100,
        borderRadius: 15,
        margin: 14,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradientContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedGradient: {
        width: 106,
        height: 106,
        borderRadius: 17,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 15,
        margin: 14,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 60,
        height: 60,
    },
    emptyBox: {
        width: 100,
        height: 100,
        borderRadius: 15,
        margin: 14,
        backgroundColor: 'transparent',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        minHeight: 421,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeIcon: {
        position: 'absolute',
        top: 18,
        right: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#121212',
        marginTop: 20,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 15,
        fontWeight: '400',
        color: '#545454',
    },
    characterImg: {
        width: 150,
        height: 'auto',
        aspectRatio: 1,
        marginVertical: 20,
    },
    characterName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#121212',
        marginBottom: 12,
    },
    starContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,
        gap: 2,
    },
    starIcon: {
        width: 25,
        height: 25,
    },
    secondModalContainer: {
        width: 310,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingVertical: 32,
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondModalTitle: {
        fontSize: 21,
        fontWeight: '700',
        color: '#121212',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 31,
    },
    secondModalText: {
        fontSize: 15,
        fontWeight: '400',
        color: '#545454',
        textAlign: 'center',
        marginBottom: 15,
    },
    secondModalBtnContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 5,
    },
    cancelButton: {
        width: 247,
        height: 57,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#C9C9C9',
    },
})

export default ListScreen;
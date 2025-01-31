import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
    Alert
} from 'react-native';

import CharacterRarity from '../../components/CharacterRarity';
import GradientButton from '../../components/GradientButton';

import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    ListScreen: undefined;
    CharacterScreen: { updatedCharacter: Character | null };
};

interface Character {
    id: number;
    name: string;
    rarity: string;
    image: any;
    owned: boolean; 
};

function ListScreen(): React.JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ListScreen'>>();

    const [selectedTab, setSelectedTab] = useState<keyof typeof tabMapping>('전체보기');
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [secondModalVisible, setSecondModalVisible] = useState(false);
    const [selectedCharacterData, setSelectedCharacterData] = useState<Character | null>(null);

    // 캐릭터 이미지
    const nullCharacterImage = require('../../img/Character/nullCharacter.png');
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

    useEffect(() => {
        fetchCharacterData(tabMapping[selectedTab]);
    }, [selectedTab]);

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
                return '매우 희귀';
            default:
                return '';
        }
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

    // 캐릭터 도감 조회 API
    const fetchCharacterData = async (viewType: string) => {
        const apiUrl = process.env.REACT_APP_API_URL;
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
                    owned: char.owned,
                    image: char.owned ? (characterImages[char.charId] || nullCharacterImage) : nullCharacterImage
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

    // 캐릭터 상세 조회 API
    const fetchCharacterDetail = async (characterId: number) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        setIsLoading(true);
        try {
            const accessToken = await AsyncStorage.getItem('token');
            const response = await fetch(`${apiUrl}/characters/detail/${characterId}`, {
                method: 'GET',
                headers: {
                    "Cache-Control": "no-store",
                    "Content-Type": "application/json",
                    access: `${accessToken}`
                },
            });

            const result = await response.json();
            if (response.ok && result.success) {
                return result.data;
            } else {
                console.error(result.message);
                return null;
            }
        } catch (error) {
            console.error("Error fetchCharacterDetail:", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // 캐릭터 상세 조회  API
    const handleCharacterModal = async (id: number) => {
        console.log('Selected Character:', id);
        const characterDetail = await fetchCharacterDetail(id);
        if (characterDetail) {
            setSelectedCharacterData({
                id: characterDetail.charId,
                name: characterDetail.charName,
                rarity: mapRarity(characterDetail.charRarity),
                image: characterImages[characterDetail.charId],
                owned: characters ? characterDetail.owned : false,
            });
            setModalVisible(true);
        }
    };

    // 대표 캐릭터로 지정하기 버튼 클릭시
    const handleFirstModalConfirm = () => {
        setModalVisible(false);
        setSecondModalVisible(true);
    };

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
                            onPress={handleSecondModalConfirm}
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

    // 대표 캐릭터 지정 API
    const handleSecondModalConfirm = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        setIsLoading(true);
        try {
            const accessToken = await AsyncStorage.getItem('token');
            const response = await fetch(`${apiUrl}/characters/main/set`, {
                method: 'PUT',
                headers: {
                    "Cache-Control": "no-store",
                    "Content-Type": "application/json",
                    access: `${accessToken}`,
                },
                body: JSON.stringify({
                    characterId: selectedCharacterData?.id,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    await AsyncStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacterData));

                    Alert.alert("대표 캐릭터가 설정되었습니다!");
                    console.log("대표 캐릭터 지정 성공", selectedCharacterData);
                    navigation.navigate("CharacterScreen", { updatedCharacter: selectedCharacterData });
                } else {
                    console.error(result.message);
                    Alert.alert(result.message);
                }
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("API error:", error);
            Alert.alert("대표 캐릭터 지정 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const handleSecondModalCancel = () => {
        setSecondModalVisible(false);
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
                        <Text style={{ color: '#9B9B9B' }}>Loading...</Text>
                    ) : (
                    <FlatList
                        data={characters}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <TouchableOpacity 
                                    key={item.id} 
                                    style={styles.characterBox}
                                    onPress={() => item.owned && handleCharacterModal(item.id)}
                                    disabled={!item.owned}
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
                                    style={{ width: 18, height: 18 }}
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
                                height={57} width={275} text="대표 캐릭터로 지정하기"
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
        marginHorizontal: 14,
        marginVertical: 10,
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
        height: 60,
        resizeMode: 'contain',
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
        top: 20,
        right: 23,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#121212',
        marginTop: 30,
        marginBottom: 5,
    },
    modalText: {
        fontSize: 17,
        fontWeight: '400',
        color: '#545454',
    },
    characterImg: {
        width: '70%',
        maxWidth: 200,
        height: undefined,
        aspectRatio: 1,
        marginVertical: 10,
        resizeMode: 'contain',
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
        marginBottom: 18,
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
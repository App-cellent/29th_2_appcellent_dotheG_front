import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';

import LeftArrow from '../../img/Home/Quiz/LeftArrow.svg';
import CheckIcon from '../../img/Home/QuestView/checkIcon.svg';
import GreenCircle from '../../img/Home/QuestView/greenCircle.svg';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const { width } = Dimensions.get('window');

function QuestViewScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const route = useRoute();
    const apiUrl = process.env.REACT_APP_API_URL;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const [userName, setUserName] = useState("");
    const [listSize, setListSize] = useState(0);
    const [activityData, setActivityData] = useState([]);

    const [isSelected, setIsSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [imageLoadError, setImageLoadError] = useState(false);

    useEffect(() => {
        const fetchQuestData = async () => {
            try {
                setIsLoading(true);
                setImageLoadError(false);

                const accessToken = await AsyncStorage.getItem('token');
                if (!accessToken) {
                    console.error('토큰이 없습니다');
                    setIsLoading(false);
                    return;
                }

                const response = await fetch(`${apiUrl}/upload/viewToday?timestamp=${new Date().getTime()}`, {
                    method: 'GET',
                    headers: {
                        "Cache-Control": 'no-store',
                        "Content-Type": "application/json",
                        access: `${accessToken}`,
                    },
                });

                if (response.status === 404) {
                    setActivityData(null);
                    setIsLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result.success) {
                    console.log(result.data);
                    setUserName(result.data.userName);
                    setListSize(result.data.listSize);
                    setActivityData(result.data.activities);
                }
            } catch (error) {
                console.error('퀘스트 데이터 불러오기 실패:', error);
                setActivityData(null);
                setImageLoadError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestData();
    }, []);

    const handleImagePress = () => {
        setIsSelected(!isSelected);
    };

    const formatImageUrl = (imagePath) => {
        if (!imagePath) return null;
        try {
            // URL이 유효한지 확인
            if (imagePath.startsWith('http')) {
                return imagePath;
            }
            // apiUrl과 imagePath 사이에 중복 슬래시 제거
            const baseUrl = apiUrl.replace(/\/+$/, '');
            const cleanImagePath = imagePath.replace(/^\/+/, '');
            return `${baseUrl}/${cleanImagePath}`;
        } catch (error) {
            console.error('URL 포맷팅 에러:', error);
            return null;
        }
    };

    const renderImage = () => {
        if (!activityData) return null;

        const imageUrl = formatImageUrl(activityData.activityImage);
        if (!imageUrl) return null;

        return (
            <TouchableOpacity onPress={handleImagePress}>
                <View style={[styles.imageWrapper, isSelected && styles.selectedImageWrapper]}>
                    <Image
                        source={{
                            uri: imageUrl,
                            cache: 'reload'
                        }}
                        style={styles.imageItem}
                        onLoadStart={() => setImageLoadError(false)}
                        onError={(e) => {
                            console.error("이미지 로드 실패:", e.nativeEvent.error);
                            setImageLoadError(true);
                        }}
                    />
                    {isSelected && <CheckIcon style={styles.checkIcon} width={30} height={30} />}
                </View>

                {isSelected && !imageLoadError && (
                    <View>
                        <Image
                            source={{
                                uri: imageUrl,
                                cache: 'reload'
                            }}
                            style={styles.selectedImage}
                            onError={(e) => console.error("큰 이미지 로드 실패:", e.nativeEvent.error)}
                        />
                        <View>
                            <Text style={styles.headerText}>인증완료 퀘스트</Text>
                            <Text style={styles.DateText}>{formattedDate}</Text>
                            <Text style={styles.redText}>
                                {activityData.activityName}. 탄소를 10g 절감했어요!
                            </Text>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <LeftArrow style={styles.closeIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>나의 퀘스트 인증</Text>
            </View>

            <View style={styles.profileContainer}>
                <Image
                    source={require('../../img/My/profileimage.png')}
                    style={styles.profileImage}
                />
                <View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.boldText}>{userName}</Text>
                        <Text style={styles.mediumText}>님의  </Text>
                    </View>
                    <Text style={styles.mediumText}>오늘의 퀘스트를 보여드릴게요.</Text>
                    <View style={[styles.rowContainer, {marginTop: 6}]}>
                        <Text style={styles.smallText}>오늘의 인증  </Text>
                        <Text style={styles.smallText}>{listSize}</Text>
                        <Text style={styles.smallText}>개</Text>
                    </View>
                </View>
            </View>

            <View style={styles.imageContainer}>
                <View style={[styles.rowContainer, {alignItems: 'center', alignSelf: 'flex-end', marginBottom: 5}]}>
                    <GreenCircle width={6} height={6}/>
                    <Text style={[styles.smallText, {color: '#C9C9C9', marginLeft: 3}]}>최신순</Text>
                </View>

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.green} />
                    </View>
                ) : imageLoadError ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>이미지를 불러올 수 없습니다.</Text>
                    </View>
                ) : (
                    renderImage()
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
    },
    errorText: {
        color: '#666',
        fontSize: getFontSize(14),
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 18,
        height: 50,
    },
    closeIcon: {
        width: 7.13,
        height: 14,
        marginRight: 18,
    },
    headerText: {
        color: colors.black,
        fontSize: getFontSize(22),
        fontWeight: '800',
        lineHeight: 34,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 24,
        paddingHorizontal: 22,
        paddingTop: 16,
    },
    profileImage: {
        width: 80,
        height: 80,
        marginRight: 12,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    boldText: {
        color: colors.black,
        fontSize: getFontSize(15),
        fontWeight: '800',
        lineHeight: 19,
    },
    mediumText: {
        color: colors.black,
        fontSize: getFontSize(15),
        fontWeight: '400',
        lineHeight: 19,
    },
    smallText: {
        color: '#7E7E82',
        fontSize: getFontSize(10),
        fontWeight: '400',
    },
    imageContainer: {
        paddingHorizontal: 22,
    },
    imageWrapper: {
        position: 'relative',
    },
    imageItem: {
        width: (width - 44) / 3 - 5,
        height: (width - 44) / 3 - 5,
        borderRadius: 5,
    },
    selectedImageWrapper: {
        borderColor: colors.green,
        borderWidth: 3,
        borderRadius: 5,
    },
    checkIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -15 }, { translateY: -15 }],
    },
    selectedImage: {
        marginTop: 15,
        width: '100%',
        height: (width * 3 / 4),
        resizeMode: 'cover',
        borderRadius: 5,
    },
    DateText: {
        color: '#545454',
        fontSize: getFontSize(15),
        fontWeight: '400',
        lineHeight: 34,
    },
    redText: {
        color: '#FF5959',
        fontSize: getFontSize(10),
        fontWeight: '400',
        lineHeight: 23,
    }
});

export default QuestViewScreen;
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';
import QuestList from "../../utils/QuestList";

import LeftArrow from '../../img/Home/Quiz/LeftArrow.svg';
import GreenCircle from '../../img/Home/QuestView/greenCircle.svg';
import CheckIcon from '../../img/Home/QuestView/checkIcon.svg';
import Complete from '../../img/Home/QuestView/complete.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const { width, height } = Dimensions.get('window');

function QuestViewScreen() {
    const navigation = useNavigation();
    const apiUrl = process.env.REACT_APP_API_URL;
    const [userName, setUserName] = useState("");
    const [listSize, setListSize] = useState(0);
    const [activityData, setActivityData] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

    const getQuestDescription = (activityId) => {
        return QuestList.find(quest => quest.activityId === activityId)?.Description || "인증완료 퀘스트";
    };

    useEffect(() => {
        const fetchQuestData = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('token');
                if (!accessToken) {
                    console.error('토큰이 없습니다');
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

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result.success) {
                    setUserName(result.data.userName);
                    setListSize(result.data.listSize);
                    if(listSize > 0) setActivityData(result.data.activities.slice(0, listSize));
                    else setActivityData(result.data.activities);
                } else {
                    console.log(result.message);
                }
            } catch (error) {
                console.error('퀘스트 데이터 불러오기 실패:', error);
                setActivityData([]);
            }
        };
        fetchQuestData();
    }, []);

    const handleImagePress = (activity) => {
        setSelectedActivity(activity);
    };

    const formatImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('data:image')) return imagePath;
        return `data:image/jpeg;base64,${imagePath}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() =>  navigation.navigate('Main')}>
                    <LeftArrow style={styles.closeIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>나의 퀘스트 인증</Text>
            </View>

            {listSize === 0 ? (
                <View style={styles.emptyContainer}>
                  <Image
                    source={require('../../img/My/graymole.png')}
                    style={styles.moleImage}
                  />
                  <Text style={styles.emptyText}>아직 인증한 퀘스트가 없어요!</Text>
                </View>
            ) : (
                <View style={styles.wrapper}>
                    <View style={styles.profileContainer}>
                        <Image source={require('../../img/My/profileimage.png')} style={styles.profileImage} />
                        <View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.boldText}>{userName}</Text>
                                <Text style={styles.mediumText}>님의  </Text>
                            </View>
                            <Text style={styles.mediumText}>오늘의 퀘스트를 보여드릴게요.</Text>
                            <View style={[styles.rowContainer, { marginTop: 6 }]}>
                                <Text style={styles.smallText}>오늘의 인증  </Text>
                                <Text style={styles.smallText}>{listSize}</Text>
                                <Text style={styles.smallText}>개</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.rowContainer, {alignItems: 'center', alignSelf: 'flex-end', marginBottom: 5, paddingRight: 20,}]}>
                        <GreenCircle width={6} height={6}/>
                        <Text style={[styles.smallText, {color: '#C9C9C9', marginLeft: 3}]}>최신순</Text>
                    </View>

                    <View style={{ flex: 0 }}>
                        <FlatList
                            key={listSize}
                            horizontal={true}
                            data={activityData}
                            keyExtractor={(item) => item.activityId.toString()}
                            contentContainerStyle={styles.imageGrid}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleImagePress(item)} style={styles.imageWrapper}>
                                    <Image
                                        source={{ uri: formatImageUrl(item.activityImage) }}
                                        style={[
                                            styles.imageItem,
                                            selectedActivity?.activityImage === item.activityImage ? styles.selectedImageBorder : null,
                                        ]}
                                    />
                                    <CheckIcon style={styles.iconOverlay} />
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                    {selectedActivity && (
                        <View style={styles.selectedImageContainer}>
                            <Image
                                source={{ uri: formatImageUrl(selectedActivity.activityImage) }}
                                style={styles.selectedImage}
                            />
                            <Text style={styles.mainText}>{getQuestDescription(selectedActivity.activityId)}</Text>
                            <View style={styles.rowContainer}>
                                <Complete width={82} height={24} />
                                <Text style={styles.DateText}>{formattedDate}</Text>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
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
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      moleImage: {
        width: 75.87,
        height: 65.87,
        marginBottom: 16.13,
      },
      emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#C9C9C9',
      },
    mainText: {
        marginBottom: 18,
        color: colors.black,
        fontSize: getFontSize(22),
        fontWeight: '800',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingTop: 16,
        paddingBottom: 24,
    },
    profileImage: {
        width: 80,
        height: 80,
        marginRight: 12,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageGrid: {
        paddingHorizontal: 15,
        paddingBottom: 0
    },
    imageWrapper: {
        justifyContent: 'center',
    },
    imageItem: {
        width: width / 3 - 20,
        height: width / 3 - 20,
        margin: 5,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    selectedImageBorder: {
        shadowColor: '#69E6A2',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 5,
        borderWidth: 3,
        borderColor: '#69E6A2',
        borderRadius: 5,
        padding: 5,
    },
    iconOverlay: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }],
    },
    selectedImageContainer: {
        paddingHorizontal: 20,
        marginTop: 13,
        marginBottom: 20,
    },
    selectedImage: {
        width: '100%',
        height: (width * 3 / 5),
        resizeMode: 'cover',
        borderRadius: 5,
        marginBottom: 17,
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
    DateText: {
        color: '#545454',
        fontSize: getFontSize(15),
        fontWeight: '400',
        lineHeight: 34,
        marginLeft: 8,
    },
    redText: {
        color: '#FF5959',
        fontSize: getFontSize(10),
        fontWeight: '400',
        lineHeight: 23,
    },
});

export default QuestViewScreen;
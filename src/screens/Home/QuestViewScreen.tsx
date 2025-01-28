import React, { useCallback, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from "../../utils/colors";
import { getFontSize } from '../../utils/fontUtils';

import LeftArrow from '../../img/Home/Quiz/LeftArrow.svg';
import CheckIcon from '../../img/Home/QuestView/checkIcon.svg';
import GreenCircle from '../../img/Home/QuestView/greenCircle.svg';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList
} from 'react-native';

const { width } = Dimensions.get('window');
const imageData = [
  require('../../img/Home/QuestView/Example.png'),
  require('../../img/Home/CloseIcon.png'),
  require('../../img/Home/InfoIcon.png'),
];

function QuestViewScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const route = useRoute();
    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImagePress = useCallback((image) => {
        setSelectedImage(image);
    }, []);

    const renderImageItem = ({ item }) => {
        const isSelected = selectedImage === item;

        return (
            <TouchableOpacity onPress={() => handleImagePress(item)}>
                <View style={[styles.imageWrapper, isSelected && styles.selectedImageWrapper]}>
                    <Image
                        source={item}
                        style={styles.imageItem}
                    />
                    {isSelected && (
                        <CheckIcon style={styles.checkIcon} width={30} height={30} />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <LeftArrow
                        style={styles.closeIcon}
                    />
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
                        <Text style={styles.boldText}>앱설런트</Text>
                        <Text style={styles.mediumText}>님의  </Text>
                    </View>
                    <Text style={styles.mediumText}>오늘의 퀘스트를 보여드릴게요.</Text>
                    <View style={[styles.rowContainer, {marginTop: 6} ]}>
                        <Text style={styles.smallText}>오늘의 인증  </Text>
                        <Text style={styles.smallText}>2</Text>
                        <Text style={styles.smallText}>개</Text>
                    </View>
                </View>
            </View>

            <View style={styles.imageContainer}>
                <View style={[styles.rowContainer, {alignItems: 'center', alignSelf: 'flex-end', marginBottom: 5,}]}>
                    <GreenCircle width={6} height={6}/>
                    <Text style={[styles.smallText, {color: '#C9C9C9', marginLeft: 3}]}>최신순</Text>
                </View>

                <FlatList
                    data={imageData}
                    renderItem={renderImageItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    columnWrapperStyle={styles.row}
                />

                {selectedImage && (
                    <View>
                        <Image
                            source={selectedImage}
                            style={styles.selectedImage}
                        />
                        <View>
                            <Text style={styles.headerText}>인증완료 퀘스트</Text>
                            <Text style={styles.DateText}>{formattedDate}</Text>
                            <Text style={styles.redText}>텀블러를 사용했어요. 탄소를 10g 절감했어요!</Text>
                        </View>
                    </View>
                )}
            </View>
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
    boldText:{
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
    smallText:{
         color: '#7E7E82',
         fontSize: getFontSize(10),
         fontWeight: '400',
    },
    imageContainer: {
        paddingHorizontal: 22,
    },
    row: {
        justifyContent: 'space-between',
    },
    imageWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
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

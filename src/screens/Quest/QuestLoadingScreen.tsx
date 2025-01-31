import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Modal,
    Image
} from 'react-native';

import GradientButton from '../../components/GradientButton';

type RootStackParamList = {
    QuestCompleteScreen: { questData: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuestCompleteScreen'>;
type RoutePropType = RouteProp<RootStackParamList, 'QuestCompleteScreen'>;

function QuestLoadingScreen(): React.JSX.Element {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RoutePropType>();

    const [modalVisible, setModalVisible] = useState(false);

    const questData = route.params?.questData;

    useEffect(() => {
        const loading = setTimeout(() => {
            navigation.navigate('QuestCompleteScreen', { questData });
        }, 3000);

        return () => clearTimeout(loading);
    }, [navigation, questData]);

    return(
        <View style={styles.container}>
            <ImageBackground
                source={require('../../img/Character/circleGradient.png')}
                style={styles.background}
            >
                <Text style={styles.text}>퀘스트 인증을</Text>
                <Text style={styles.text}>확인 중이에요...</Text>
                <Text style={styles.smallText}>잠시만 기다려주세요</Text>
            </ImageBackground>

            {/* 퀘스트 인증 실패 모달 */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Image
                            source={require('../../img/Quest/fail.png')}
                            style={styles.icon}
                        />

                        <Text style={styles.modalTitle}>퀘스트 인증을 실패했어요.</Text>
                        <View style={styles.modalButtonContainer}>
                            <GradientButton
                                height={57} width={267} text="다시 촬영하기"
                                onPress={() => navigation.navigate('CameraScreen')}
                            />
                            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalCancelText}>홈으로 돌아가기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: 334,
        height: 334,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 33,
        height: 33,
    },
    text:{
        fontSize: 23,
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: 4,
    },
    smallText: {
        color: '#545454',
        fontSize: 16,
        fontWeight: 500,
        marginTop: 14,
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
    }
})

export default QuestLoadingScreen;
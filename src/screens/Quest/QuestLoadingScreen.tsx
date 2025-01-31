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
    Image,
    ActivityIndicator,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientButton from '../../components/GradientButton';

type RootStackParamList = {
    QuestCompleteScreen: { questData: any };
    CameraScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuestCompleteScreen'>;
type RoutePropType = RouteProp<RootStackParamList, 'QuestCompleteScreen'>;

function QuestLoadingScreen(): React.JSX.Element {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RoutePropType>();

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const { formData } = route.params;

    useEffect(() => {
        const submitQuest = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('token');
                console.log('Access Token:', accessToken);

                const response = await fetch(`${apiUrl}/upload/certification?timestamp=${new Date().getTime()}`, {
                    method: 'POST',
                    headers: {
                        "Cache-Control": 'no-store',
                        access: `${accessToken}`,
                    },
                    body: formData,
                });

                const responseText = await response.text();
                console.log('Response Text:', responseText);
                const result = JSON.parse(responseText);

                if (response.ok && result.success) {
                    navigation.navigate('QuestCompleteScreen', { formData });
                } else {
                    setModalVisible(true); // 인증 실패 시 모달 띄움
                }
            } catch (error) {
                console.error('퀘스트 인증 중 오류:', error);
                Alert.alert('알림', '퀘스트 인증 중 오류가 발생했습니다. 다시 시도해주세요.');
                setModalVisible(true);
            } finally {
                setLoading(false);
            }
        };

        submitQuest();
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../img/Character/circleGradient.png')}
                style={styles.background}
            >
                {loading ? (
                    <>
                        <ActivityIndicator size="large" color="#69E6A2" />
                        <Text style={styles.text}>퀘스트 인증을</Text>
                        <Text style={styles.text}>확인 중이에요...</Text>
                        <Text style={styles.smallText}>잠시만 기다려주세요</Text>
                    </>
                ) : null}
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
                                height={57}
                                width={267}
                                text="다시 촬영하기"
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate('CameraScreen');
                                }}
                            />
                            <TouchableOpacity
                                style={styles.modalCancelButton}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate('Main');
                                }}
                            >
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
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 4,
    },
    smallText: {
        color: '#545454',
        fontSize: 16,
        fontWeight: '500',
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
});

export default QuestLoadingScreen;

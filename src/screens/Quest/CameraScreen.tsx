import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ActivityIndicator, StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { Camera, useCameraDevice, CameraRuntimeError } from 'react-native-vision-camera';
import { PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const CameraScreen = () => {
  const [cameraPermission, setCameraPermission] = useState<string>('not-determined');
  const [questText, setQuestText] = useState<string>('텀블러 사용하기');
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const navigation = useNavigation();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: '카메라 권한',
        message: '사진 촬영을 위해서는 카메라 권한이 필요합니다.',
        buttonNeutral: '나중에 알리기',
        buttonNegative: '취소',
        buttonPositive: '확인',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setCameraPermission('granted');
        console.log('You can use the camera');
      } else {
        setCameraPermission('denied');
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
      setCameraPermission('denied');
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  const handleCapturePhoto = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();
        console.log('Photo captured:', photo);
        navigation.navigate('QuestConfirmationScreen', { photoPath: photo.path });
      } catch (error) {
        console.error('Failed to capture photo:', error);
      }
    }
  };

  const handleExit = () => {
    navigation.goBack();
  };

  if (device == null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={20} color={'red'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 카메라 화면 */}
      {device && (
        <Camera
          style={styles.camera}
          isActive={true}
          photo={true}
          device={device}
          ref={camera}
          onError={onError}
        />
      )}

      <View style={styles.topBackground} />
      <View style={styles.leftBackground} />
      <View style={styles.rightBackground} />
      <View style={styles.bottomBackground}>
        <Text style={styles.bottomText}>
          오늘의 퀘스트는 <Text style={{ color: '#69E6A2' }}>{questText}</Text>에요.
        </Text>
      </View>

      {/* 프레임 */}
      <View style={styles.cameraFrame}>
        <Image
          source={require('../../img/Quest/frame.png')}
          style={styles.frameImage}
        />
      </View>

      <View style={styles.header}>
        <TouchableOpacity style={styles.logoContainer}>
          <Image
            source={require('../../img/Quest/DotheG.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Image
            source={require('../../img/Quest/exit.png')}
            style={styles.exitIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.topVectorContainer}>
        <Image
          source={require('../../img/Quest/topvector.png')}
          style={styles.topVector}
        />
        <Text style={styles.topVectorText}>오늘의 퀘스트 인증 <Text style={{ color: '#FFF79C' }}>DO</Text>!</Text>
      </View>

      {/* 카메라 촬영 버튼 */}
      <TouchableOpacity style={styles.captureButton} onPress={handleCapturePhoto}>
        <Image
          source={require('../../img/Quest/camerabutton.png')}
          style={styles.captureButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  leftBackground: {
    position: 'absolute',
    top: 160,
    left: 0,
    bottom: 0,
    width: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  rightBackground: {
    position: 'absolute',
    top: 160,
    right: 0,
    bottom: 0,
    width: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomBackground: {
    position: 'absolute',
    top: 600,
    bottom: 0,
    left: 25,
    right: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  bottomText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'regular',
    top: 30,
  },
  cameraFrame: {
    position: 'absolute',
    top: 160,
    left: 25,
    right: 25,
    height: 440,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  frameImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 93,
    height: 34,
    resizeMode: 'contain',
    position: 'absolute',
  },
  exitButton: {
    alignItems: 'center',
  },
  exitIcon: {
    resizeMode: 'contain',
  },
  topVectorContainer: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    height: 77,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topVector: {
    width: '100%',
    height: 77,
    resizeMode: 'stretch',
  },
  topVectorText: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    textShadowColor: '#41ABD4',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  captureButton: {
    position: 'absolute',
    top: 680,
    alignSelf: 'center',
    zIndex: 2,
  },
  captureButtonImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});

export default CameraScreen;

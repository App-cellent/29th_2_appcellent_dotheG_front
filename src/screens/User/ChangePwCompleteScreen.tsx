import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    StyleSheet, 
    Text, 
    View, 
    ImageBackground, 
    Image, 
    TouchableOpacity 
} from 'react-native';

function ChangePwCompleteScreen(): React.JSX.Element {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity  
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={styles.closeIconContainer}
                >
                    <Image
                        source={require('../../img/User/closeIcon.png')}
                        style={styles.closeIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>비밀번호 변경</Text>
            </View>
            <View style={styles.bodyContainer}>
                <ImageBackground
                    source={require('../../img/User/circleGreen.png')}
                    style={styles.background}
                >
                    <Text style={styles.text}>비밀번호가 변경되었어요 :)</Text>
                    <Text style={styles.smallText}>다시 로그인 화면으로 돌아갑니다.</Text>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    closeIconContainer: {
        position: 'absolute',
        left: 22,
        bottom: 18.92,
        zIndex: 1,
    },
    closeIcon: {
        width: 18.34,
        height: 18.08,
    },
    headerText: {
        flex: 1,
        color: '#393939',
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 34,
        textAlign: 'center',
    },
    bodyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: 334,
        height: 334,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: '#121212',
        fontSize: 24,
        fontWeight: 700,
        textAlign: 'center',
        lineHeight: 34,
    },
    smallText: {
        color: '#545454',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 34,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    },
})

export default ChangePwCompleteScreen;
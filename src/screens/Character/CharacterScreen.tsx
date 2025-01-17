import * as React from 'react'
import { useNavigation } from '@react-navigation/native';
import colors from "../../utils/colors";
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import CharacterRarity from '../../components/CharacterRarity';
import GradientButton from "../../components/GradientButton";

function CharacterScreen(): React.JSX.Element {
    const navigation = useNavigation();

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
                    <Image
                        source={require('../../img/Character/bonus/[17]earth.png')}
                        style={styles.characterImg}
                    />
                    <Text style={styles.characterName}>파란 지구</Text>
                    <CharacterRarity rarity={4}></CharacterRarity>
                    <View style={styles.squareContainer}>
                        <View style={styles.leafContainer}>
                            <Image
                                source={require('../../img/Character/leaf.png')}
                                style={styles.leafImg}
                            />
                            <Text style={styles.leafNum}>261</Text>
                        </View>
                        <GradientButton
                            height={64} width={280} text="캐릭터 뽑기"
                            onPress={() => navigation.navigate('DrawScreen')}
                        />
                    </View>
                </View>
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
        width: 268,
        height: 184,
        marginTop: 116,
        marginBottom: 40,
        // android 그림자
        // elevation: 3,
        // ios 그림자
        // shadowColor: '#000000',
        // shadowOffset: {width: 2, height: 2},
        // shadowOpacity: 0.3,
        // shadowRadius: 3,
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
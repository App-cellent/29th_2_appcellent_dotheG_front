import * as React from 'react'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

function ListScreen(): React.JSX.Element {
    const navigation = useNavigation();

    return(
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
                    <TouchableOpacity>
                        <Image
                            source={require('../../img/Character/listIconGradient.png')}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.textSmall}>지금까지 이만큼 모았어요!</Text>
                <Text style={styles.textLarge}>캐릭터 도감을 살펴보세요.</Text>
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
    background: {

    },
    textSmall: {
        color: '#545454',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 34,
        marginLeft: 22,
        marginTop: 23,
    },
    textLarge: {
        color: '#121212',
        fontSize: 25,
        fontWeight: 700,
        lineHeight: 34,
        marginLeft: 22,
    }
})

export default ListScreen;
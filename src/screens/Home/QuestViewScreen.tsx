import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from "../../../utils/colors";
import { getFontSize } from '../../../utils/fontUtils';

import GradientButton from "../../../components/GradientButton";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const { height } = Dimensions.get('window');

function QuestViewScreen(): React.JSX.Element {
    const navigation = useNavigation();
    const route = useRoute();

    const handleNavigateQuizPress = useCallback(async () => {
    }, []);

    return (
        <View style={styles.container}>

            <Text> 활동 인증 </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },

});

export default QuestViewScreen;
// react, react-native
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
View,
Text,
TouchableOpacity,
StyleSheet,
} from 'react-native';
// components
import BottomTabNavigator from './BottomTabNavigator';
import DoTheG from '../img/DoTheG.svg';
import AlarmIcon from '../img/AlarmIcon.svg';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{
            header: () => (
            <View style={styles.customHeader}>
              <View style={styles.headerLeft}>
                <DoTheG />
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity>
                  <AlarmIcon />
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    borderBottomColor: '#C9C9C9',
    borderBottomWidth: 0.5
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StackNavigator;
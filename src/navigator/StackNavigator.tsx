// react, react-native
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// components
import BottomTabNavigator from './BottomTabNavigator';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{
            headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
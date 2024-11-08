/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, createContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import StackNavigator from './src/navigator/StackNavigator';

function App(): React.JSX.Element {
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };
  return (
    <NavigationContainer theme={customTheme}>
        <StackNavigator />
    </NavigationContainer>
  );
}

export default App;

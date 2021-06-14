import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CardGameScreen from './src/screens/CardGame.screen';
import GameListScreen from './src/screens/GameList.screen';
import RunnerGameScreen from './src/screens/RunnerGame.screen';
import TestScreen from './src/screens/test.screen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GameList" component={GameListScreen} />
        <Stack.Screen name="CardGame" component={CardGameScreen} />
        <Stack.Screen name="RunnerGame" component={RunnerGameScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

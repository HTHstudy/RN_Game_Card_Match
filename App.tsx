import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CardGameScreen from './src/screens/CardGame.screen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CardGame" component={CardGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

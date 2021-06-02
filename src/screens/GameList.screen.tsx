import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, View} from 'react-native';

function GameListScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Button title="카드게임" onPress={() => navigation.navigate('CardGame')} />
      <Button title="달리기게임" onPress={() => navigation.navigate('RunnerGame')} />
    </View>
  );
}

export default GameListScreen;

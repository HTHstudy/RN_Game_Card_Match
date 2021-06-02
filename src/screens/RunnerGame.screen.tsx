import React, {useEffect, useState} from 'react';
import {View, Dimensions, TouchableOpacity, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';

const background = require('../../assets/runnergame/background.json');
const blackMan = require('../../assets/runnergame/blackman.json');
let Window = Dimensions.get('window');
let windowWidth = Window.width;

const SIZE = windowWidth / 6;

const RunnerGameScreen = () => {
  const [manColor, setManColor] = useState<changeColor[]>([]);
  const [manRef, setManRef] = useState<LottieView | null>();
  const [top, setTop] = useState(5);

  useEffect(() => {
    if (manRef) manRef.play();
  }, [manColor]);

  return (
    <View>
      <View style={{position: 'absolute', zIndex: 2, marginTop: SIZE}}>
        {[0, 1, 2, 3, 4].map(top => (
          <View key={top} style={[styles.line, {top: SIZE * top}]} />
        ))}
      </View>
      <LottieView source={background} autoPlay loop={true} speed={0.2} resizeMode="cover" style={styles.background} />
      <View style={[styles.manContainer, {top: SIZE * top + 3}]}>
        <LottieView
          ref={man => {
            setManRef(man);
          }}
          source={blackMan}
          autoPlay
          loop={true}
          speed={0.8}
          style={{width: 537 * 0.06, height: 984 * 0.06}}
          colorFilters={manColor}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.colorButton, {backgroundColor: colors.red}]}
          onPress={() => {
            setManColor(changeRed);
          }}
        />
        <TouchableOpacity
          style={[styles.colorButton, {backgroundColor: colors.blue}]}
          onPress={() => {
            setManColor(changeBlue);
          }}
        />
        <TouchableOpacity
          style={[styles.colorButton, {backgroundColor: colors.black}]}
          onPress={() => {
            setManColor(changeBlack);
          }}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.upDownButton}
          onPress={() => {
            if (top > 0) setTop(top => (top -= 0.5));
          }}>
          <Text>UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.upDownButton}
          onPress={() => {
            if (top < 5) setTop(top => (top += 0.5));
          }}>
          <Text>DOWN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RunnerGameScreen;

const colors = {
  red: '#e3342f',
  blue: '#3490dc',
  black: '#000000',
};

interface changeColor {
  keypath: string;
  color: string;
}
const changeRed: changeColor[] = [
  {keypath: 'Union 1', color: colors.red},
  {keypath: 'Union 2', color: colors.red},
  {keypath: 'Union 3', color: colors.red},
  {keypath: 'Union 4', color: colors.red},
  {keypath: 'Union 5', color: colors.red},
  {keypath: 'Union 6', color: colors.red},
  {keypath: 'Union 7', color: colors.red},
];

const changeBlue = [
  {keypath: 'Union 1', color: colors.blue},
  {keypath: 'Union 2', color: colors.blue},
  {keypath: 'Union 3', color: colors.blue},
  {keypath: 'Union 4', color: colors.blue},
  {keypath: 'Union 5', color: colors.blue},
  {keypath: 'Union 6', color: colors.blue},
  {keypath: 'Union 7', color: colors.blue},
];

const changeBlack = [
  {keypath: 'Union 1', color: colors.black},
  {keypath: 'Union 2', color: colors.black},
  {keypath: 'Union 3', color: colors.black},
  {keypath: 'Union 4', color: colors.black},
  {keypath: 'Union 5', color: colors.black},
  {keypath: 'Union 6', color: colors.black},
  {keypath: 'Union 7', color: colors.black},
];

const styles = StyleSheet.create({
  background: {
    width: windowWidth,
    height: windowWidth,
    backgroundColor: '#46636C',
  },
  manContainer: {
    position: 'absolute',
    left: 20,
    zIndex: 3,
  },
  line: {
    position: 'absolute',
    width: windowWidth,
    height: SIZE,
    borderTopWidth: 2,
    borderTopColor: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: SIZE / 2,
  },
  colorButton: {
    width: 30,
    height: 30,
  },
  upDownButton: {
    backgroundColor: '#CCCCFF',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

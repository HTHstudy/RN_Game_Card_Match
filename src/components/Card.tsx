import React, {useEffect} from 'react';
import {Pressable, Animated, Dimensions, StyleSheet, Image} from 'react-native';
import {CARD_BACK} from '../lib/CardImages';

interface CardProps {
  id: number;
  animatedValue: Animated.Value;
  imgObj: number;
  key: number;
  onPressHandler: (id: number, flipped: boolean, count: number, imgObj: number) => void;
  flipped: boolean;
  count: number;
  answer: number[];
  fixed: boolean;
  checkAnswer: () => void;
}
const Card = (props: CardProps) => {
  const {id, animatedValue, imgObj, onPressHandler, flipped, count, checkAnswer} = props;

  useEffect(() => {
    if (flipped || flipped === null) {
      cardOpen();
      return;
    }

    cardClose();
  }, [flipped]);

  let frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  let backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const forntAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };
  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  const cardClose = () => {
    Animated.spring(animatedValue, {
      toValue: 0,
      friction: 8,
      tension: 20,
      useNativeDriver: true,
    }).start();
  };
  const cardOpen = () => {
    Animated.spring(animatedValue, {
      toValue: 180,
      friction: 8,
      tension: 20,
      useNativeDriver: true,
      restDisplacementThreshold: 40,
      restSpeedThreshold: 100,
    }).start(checkAnswer);
  };

  return (
    <Pressable
      onPress={() => {
        if (flipped !== null) onPressHandler(id, flipped, count, imgObj);
      }}>
      <Animated.View style={[forntAnimatedStyle, styles.flipCard]}>
        <Image source={CARD_BACK} style={{width: CARD_WIDTH, height: CARD_HEIGHT}} resizeMode="contain" />
      </Animated.View>
      <Animated.View style={[backAnimatedStyle, styles.flipCardBack, styles.flipCard]}>
        <Image source={imgObj} style={{width: CARD_WIDTH, height: CARD_HEIGHT}} resizeMode="contain" />
      </Animated.View>
    </Pressable>
  );
};

export default React.memo(Card);

let Window = Dimensions.get('window');
const CARD_WIDTH = Window.width / 6;
const CARD_HEIGHT = Window.height / 8;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    width: CARD_WIDTH * 5,
    height: CARD_HEIGHT * 4.5,
    position: 'absolute',
    backgroundColor: 'lightgray',
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flipCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
  },
});

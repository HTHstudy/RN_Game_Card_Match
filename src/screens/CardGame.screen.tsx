import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Card from '../components/Card';
import {CardData, CardDataType} from '../lib/CardData';
import {CARD_DECK} from '../lib/CardImages';

const CardGameScreen = () => {
  const [initData] = useState(initDataSet());
  const [flippedArray, setFlippedArray] = useState(new Array(16).fill(false));
  const answer = useRef<number[]>([]);
  const animatedCount = useRef(0);

  const onPressHandler = (id: number, flippedValue: boolean, count: number, imgObj: number) => {
    if (flippedValue) return;
    if (count > 1 && !flippedValue) return;

    setFlippedArray(flipped => {
      const s = flipped.slice();
      s[id] = !flippedValue;
      return s;
    });

    if (!flippedValue) answer.current.push(imgObj);
  };

  const checkAnswer = () => {
    animatedCount.current += 1;

    if (animatedCount.current > 1) {
      if (answer.current.length > 1) {
        if (answer.current[0] === answer.current[1]) {
          setFlippedArray(flipped => {
            const s = flipped.slice();
            s.forEach((el, i) => {
              if (el === true) s[i] = null;
            });
            return s;
          });
        } else {
          setFlippedArray(flipped => {
            const s = flipped.slice();
            s.forEach((el, i) => {
              if (el === true) s[i] = false;
            });
            return s;
          });
        }
        answer.current = [];
      }
      animatedCount.current = 0;
    }
  };

  const renderCards = (cardData: CardDataType[][]) => {
    const cards = cardData.map((row, i) => {
      return (
        <View style={styles.cardRow} key={i}>
          {row.map(e => (
            <Card
              id={e.key}
              onPressHandler={onPressHandler}
              animatedValue={e.animatedValue}
              imgObj={e.imgObj}
              key={e.key}
              flipped={flippedArray[e.key]}
              count={flippedArray.filter(el => el === true).length}
              answer={answer.current}
              fixed={e.fixed}
              checkAnswer={checkAnswer}
            />
          ))}
        </View>
      );
    });
    return cards;
  };

  return (
    <View style={styles.background}>
      <View style={{position: 'absolute', top: 0}}>
        <Text>{flippedArray.filter(el => el === true).length}</Text>
      </View>
      <View style={styles.cardContainer}>{renderCards(initData)}</View>
    </View>
  );
};

export default CardGameScreen;

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
    alignContent: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
});

const initDataSet = () => {
  let keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  var cardData = keys.map(key => {
    let cardImg = key > 7 ? CARD_DECK[key - 8] : CARD_DECK[key];
    let data = CardData(cardImg, key);
    return data;
  });

  function shuffle(a: Array<any>) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  shuffle(cardData);

  const cardImages: any = [];
  for (let i = 0; i < 4; i++) {
    cardImages.push([]);
    for (let j = 0; j < 4; j++) {
      cardImages[i][j] = cardData.shift();
    }
  }

  return cardImages;
};

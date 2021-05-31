import {Animated} from 'react-native';

export interface CardDataType {
  id: number;
  key: number;
  animatedValue: Animated.Value;
  imgObj: any;
  fixed: boolean;
}

export function CardData(imgObj: any, key: number): CardDataType {
  return {
    id: key,
    key: key,
    animatedValue: new Animated.Value(0),
    imgObj: imgObj,
    fixed: false,
  };
}

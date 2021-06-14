import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import _ from 'lodash';

function TestScreen() {
  const aaa = {
    a: 'test',
    b: 123,
    c: [1, 2, 3, 4],
    d: () => console.log(123),
    e: {1: 1, 2: {2: 2}},
  };
  const bbb = _.cloneDeep(aaa);
  bbb.b = 456;
  aaa.c[0] = 999;

  useMemo(() => {
    console.log('aaa', aaa);
    console.log('bbb', bbb);
  }, []);

  return (
    <View>
      <Text>test</Text>
    </View>
  );
}

export default TestScreen;

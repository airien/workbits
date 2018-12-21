import React from 'react';
import { View, Text } from 'react-native';

export default function Result({
  type,
  date
}) {
  return (
    <View>
      <Text>{`Type: ${type}`}</Text>
      <Text>{`Date: ${date}`}</Text>
    </View>
  );
}


import React, { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Animated } from 'react-native';

type Props = {
  size?: number;
};

export const Spinner = ({ size = 26 }: Props) => {
  const spinAnimation = new Animated.Value(0);
  const rotation = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnimation, { toValue: 1, duration: 2000 })
    ).start();
  });

  return (
    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
      <FontAwesome name={'spinner'} size={size} style={{ color: '#333' }} />
    </Animated.View>
  );
};

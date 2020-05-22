import React, { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Animated } from 'react-native';
import { withTheme } from 'styled-components';

type Props = {
  size?: number;
  theme: unknown;
};

export const Icon = ({ size = 26, theme }: Props) => {
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
      <FontAwesome
        name={'spinner'}
        size={size}
        style={{ color: theme.iconColor }}
      />
    </Animated.View>
  );
};

export const Spinner = withTheme(Icon);

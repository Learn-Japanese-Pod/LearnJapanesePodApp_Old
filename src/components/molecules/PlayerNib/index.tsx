import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { PanResponder, Dimensions } from 'react-native';
import { jumpToAudio } from '../../../store/player/actions';

const Circle = styled.View`
  width: 30px;
  height: 30px;
  background-color: #333;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 99;
  border-radius: 30px;
  margin-left: -15px;
`;

type Props = {
  complete: number;
};

export const PlayerNib = ({ complete }: Props) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const dispatch = useDispatch();
  const [posX, setPosX] = useState(0);
  const [moving, setMoving] = useState(false);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => setMoving(true),
    onPanResponderMove: (evt, gestureState) => {
      const calc = (gestureState.moveX / screenWidth) * 100;
      setPosX(calc);
    },
    onPanResponderRelease: () => {
      dispatch(jumpToAudio(posX));
      setTimeout(() => {
        setMoving(false);
      }, 500);
    },
    onShouldBlockNativeResponder: () => true,
  });

  let newPos: number | string = `${complete}%`;

  if (moving) {
    newPos = `${posX}%`;
  } else {
    newPos = `${complete}%`;
  }

  return <Circle {...panResponder.panHandlers} style={{ left: newPos }} />;
};

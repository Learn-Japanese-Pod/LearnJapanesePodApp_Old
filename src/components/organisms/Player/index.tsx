import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCurrentlyPlaying,
  getStatus,
  getFetching,
} from '../../../store/player/selectors';
import styled, { css, ThemeProvider } from 'styled-components/native';
import { TouchableOpacity, Dimensions } from 'react-native';
import { green, lightTheme } from '../../../colors';
import { Text } from 'react-native';
import { PlayerNib } from '../../molecules/PlayerNib';
import {
  FontAwesome,
  MaterialIcons,
  Entypo,
  Feather,
} from '@expo/vector-icons';
import { Spinner } from '../../atoms/Spinner';
import {
  playAudio,
  pauseAudio,
  toggleLoop,
  toggleMute,
  ffAudio,
  rwAudio,
  jumpToAudio,
} from '../../../store/player/actions';

const Wrap = styled.View`
  height: 150px;
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: ${props => props.theme.playerBG};
  border-top-width: 2px;
  border-color: #ddd;
`;

const ProgressWrap = styled.View`
  width: 90%;
  border-radius: 8px;
  position: relative;
  flex: 1;
  display: flex;
  flex-flow: row;
  align-items: center;
`;

const BarCSS = css`
  height: 10px;
  position: absolute;
  border-radius: 8px;
`;

const ProgressBar = styled.View`
  ${BarCSS};
  width: ${(props: Progress) => props.complete}%;
  background-color: ${green};
  z-index: 2;
`;

const BufferBar = styled.View`
  ${BarCSS};
  width: ${(props: Buffer) => props.buffer}%;
  background-color: ${props => props.theme.playerBufferBarBG};
  opacity: 0.3;
  z-index: 1;
`;

const BackBar = styled.View`
  ${BarCSS};
  width: 100%;
  background-color: ${props => props.theme.playerBackBarBG};
  z-index: 0;
`;

const TouchBar = styled.TouchableOpacity`
  ${BarCSS};
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 80;
`;

const Controls = styled.View`
  flex: 2;
  display: flex;
  align-items: center;
  flex-flow: row;
  justify-content: space-around;
  width: 100%;
  padding-bottom: 16px;
`;

const NowPlayingWrap = styled.View`
  padding-top: 16px;
  padding-bottom: 8px;
`;

const NowPlayingText = styled(Text)`
  padding-horizontal: 16px;
`;

const IconWrap = styled.View``;

type Progress = {
  complete: number;
};

type Buffer = {
  buffer: number;
};

export const Player = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(getFetching);
  const { title } = useSelector(getCurrentlyPlaying);
  const screenWidth = Math.round(Dimensions.get('window').width);
  const theme = lightTheme;
  const {
    durationMillis,
    isBuffering,
    isLooping,
    isMuted,
    isPlaying,
    isLoaded,
    playableDurationMillis,
    positionMillis,
  } = useSelector(getStatus) || {};

  const handlePlay = () => {
    if (!isFetching) dispatch(playAudio());
  };

  const handleFF = () => {
    if (!isFetching) dispatch(ffAudio());
  };

  const handleRW = () => {
    if (!isFetching) dispatch(rwAudio());
  };

  const handlePause = () => {
    if (!isFetching) dispatch(pauseAudio());
  };

  const handleMute = () => {
    dispatch(toggleMute());
  };

  const handleLoop = () => {
    dispatch(toggleLoop());
  };

  const handleBarPress = evt => {
    const calc = (evt.nativeEvent.locationX / screenWidth) * 100;
    dispatch(jumpToAudio(calc));
  };

  const completionPercentage = (positionMillis / durationMillis) * 100;
  const bufferedPercentage = (playableDurationMillis / durationMillis) * 100;

  let MainIcon = <Spinner size={45} />;

  if (isBuffering) MainIcon = <Spinner size={45} />;

  if (!isPlaying && isLoaded && !isBuffering) {
    MainIcon = (
      <TouchableOpacity onPress={handlePlay}>
        <FontAwesome name={'play-circle'} size={45} />
      </TouchableOpacity>
    );
  }
  if (isPlaying && isLoaded) {
    MainIcon = (
      <TouchableOpacity onPress={handlePause}>
        <FontAwesome name={'pause-circle'} size={45} />
      </TouchableOpacity>
    );
  }

  const RW = (
    <TouchableOpacity onPress={handleRW}>
      <MaterialIcons name="replay-30" size={30} />
    </TouchableOpacity>
  );

  const FF = (
    <TouchableOpacity onPress={handleFF}>
      <MaterialIcons name="forward-30" size={30} />
    </TouchableOpacity>
  );

  const Loop = (
    <TouchableOpacity onPress={handleLoop}>
      <Entypo
        name="loop"
        size={30}
        style={{ color: isLooping ? '#3cd070' : '#333' }}
      />
    </TouchableOpacity>
  );

  const Muted = (
    <TouchableOpacity onPress={handleMute}>
      <Feather name="volume-x" size={30} />
    </TouchableOpacity>
  );

  const NotMuted = (
    <TouchableOpacity onPress={handleMute}>
      <Feather name="volume-2" size={30} />
    </TouchableOpacity>
  );

  const mutedIcon = isMuted ? Muted : NotMuted;

  if (!title) return null;

  return (
    <ThemeProvider theme={theme}>
      <Wrap>
        <NowPlayingWrap>
          <NowPlayingText numberOfLines={1}>{title}</NowPlayingText>
        </NowPlayingWrap>
        <ProgressWrap>
          <TouchBar onPress={handleBarPress} />
          <BackBar pointerEvents="none" />
          <ProgressBar pointerEvents="none" complete={completionPercentage} />
          <BufferBar pointerEvents="none" buffer={bufferedPercentage} />
          <PlayerNib complete={completionPercentage} />
        </ProgressWrap>
        <Controls>
          <IconWrap>{mutedIcon}</IconWrap>
          <IconWrap>{RW}</IconWrap>
          <IconWrap>{MainIcon}</IconWrap>
          <IconWrap>{FF}</IconWrap>
          <IconWrap>{Loop}</IconWrap>
        </Controls>
      </Wrap>
    </ThemeProvider>
  );
};

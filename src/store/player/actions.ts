import { createActions } from 'redux-actions';

export const {
  setPlayer,
  createNewPlayer,
  requestNewAudio,
  setStatus,
  setCurrentlyPlaying,
  pauseAudio,
  playAudio,
  ffAudio,
  rwAudio,
  toggleMute,
  toggleLoop,
  setFetching,
  jumpToAudio,
} = createActions(
  {},
  ...[
    'SET_PLAYER',
    'CREATE_NEW_PLAYER',
    'REQUEST_NEW_AUDIO',
    'SET_CURRENTLY_PLAYING',
    'SET_STATUS',
    'PLAY_AUDIO',
    'PAUSE_AUDIO',
    'RW_AUDIO',
    'FF_AUDIO',
    'TOGGLE_MUTE',
    'TOGGLE_LOOP',
    'SET_FETCHING',
    'JUMP_TO_AUDIO',
  ],
  {
    prefix: 'PLAYER',
  }
);

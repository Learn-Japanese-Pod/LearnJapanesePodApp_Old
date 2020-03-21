import { handleActions } from 'redux-actions';
import { initialState } from './constants';
import {
  setPlayer,
  setStatus,
  setCurrentlyPlaying,
  setFetching,
} from './actions';

export function setPlayerReducer(state, action) {
  return {
    ...state,
    player: action.payload,
  };
}

export function setStatusReducer(state, action) {
  return {
    ...state,
    status: action.payload,
  };
}

export function setCurrentlyPlayingReducer(state, action) {
  return {
    ...state,
    currentlyPlaying: action.payload,
  };
}

export function setFetchingReducer(state, action) {
  return {
    ...state,
    fetching: action.payload,
  };
}

export const reducer = handleActions(
  {
    [setPlayer.toString()]: setPlayerReducer,
    [setStatus.toString()]: setStatusReducer,
    [setCurrentlyPlaying.toString()]: setCurrentlyPlayingReducer,
    [setFetching.toString()]: setFetchingReducer,
  },
  initialState
);

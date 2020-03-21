import { GlobalState } from '../types';

const getState = (state: GlobalState) => state.player;

export const getPlayer = (state: GlobalState) => getState(state).player;

export const getStatus = (state: GlobalState) => getState(state).status;

export const getFetching = (state: GlobalState) => getState(state).fetching;

export const getCurrentlyPlaying = (state: GlobalState) =>
  state.player.currentlyPlaying;

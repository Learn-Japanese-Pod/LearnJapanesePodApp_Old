import { GlobalState } from '../types';

const getState = (state: GlobalState) => state.network;

export const getConnected = (state: GlobalState) => getState(state).connected;

import { handleActions } from 'redux-actions';
import { setNetworkStatus } from './actions';
import { initialState } from './constants';

export function setNetworkStatusReducer(state, action) {
  return {
    ...state,
    connected: action.payload,
  };
}

export const reducer = handleActions(
  {
    [setNetworkStatus.toString()]: setNetworkStatusReducer,
  },
  initialState
);

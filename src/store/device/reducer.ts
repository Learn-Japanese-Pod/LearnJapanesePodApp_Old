import { handleActions } from 'redux-actions';
import { initialState } from './constants';
import {
  setLoading,
  rehydrateDeviceState,
  setPermission,
  setPushToken,
} from './actions';

export function rehydrateDeviceStateReducer(state, action) {
  return {
    ...action.payload,
    loading: true,
  };
}

export function setLoadingReducer(state, action) {
  return {
    ...state,
    loading: action.payload,
  };
}

export function setPermissionsReducer(state, action) {
  return {
    ...state,
    notificationPermissions: action.payload,
  };
}

export function setPushTokenReducer(state, action) {
  return {
    ...state,
    pushToken: action.payload,
  };
}

export const reducer = handleActions(
  {
    [rehydrateDeviceState.toString()]: rehydrateDeviceStateReducer,
    [setLoading.toString()]: setLoadingReducer,
    [setPermission.toString()]: setPermissionsReducer,
    [setPushToken.toString()]: setPushTokenReducer,
  },
  initialState
);

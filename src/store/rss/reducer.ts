import { handleActions } from 'redux-actions';
import { saveMainFeed, rehydrateRssState, setRefreshing } from './actions';
import { initialState } from './constants';

export function rehydrateRssStateReducer(state, action) {
  return {
    ...action.payload,
  };
}

export function saveMainFeedReducer(state, action) {
  return {
    ...state,
    mainFeed: action.payload,
  };
}

export function setRefreshingReducer(state, action) {
  return {
    ...state,
    refreshing: action.payload,
  };
}

export const reducer = handleActions(
  {
    [rehydrateRssState.toString()]: rehydrateRssStateReducer,
    [saveMainFeed.toString()]: saveMainFeedReducer,
    [setRefreshing.toString()]: setRefreshingReducer,
  },
  initialState
);

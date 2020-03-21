import { createActions } from 'redux-actions';

export const {
  getMainFeed,
  saveMainFeed,
  rehydrateRssState,
  refreshMainFeed,
  setRefreshing,
} = createActions(
  {},
  ...[
    'GET_MAIN_FEED',
    'SAVE_MAIN_FEED',
    'REHYDRATE_RSS_STATE',
    'REFRESH_MAIN_FEED',
    'SET_REFRESHING',
  ],
  {
    prefix: 'RSS',
  }
);

import { createActions } from 'redux-actions';

export const {
  setPodcastDetails,
  setStarred,
  rehydrateDetailsState,
  updatePodcastDetails,
  setDownloaded,
} = createActions(
  {},
  ...[
    'SET_PODCAST_DETAILS',
    'SET_STARRED',
    'REHYDRATE_DETAILS_STATE',
    'UPDATE_PODCAST_DETAILS',
    'SET_DOWNLOADED',
  ],
  {
    prefix: 'DETAILS',
  }
);

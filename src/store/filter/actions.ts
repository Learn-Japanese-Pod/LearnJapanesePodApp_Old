import { createActions } from 'redux-actions';

export const {
  setSort,
  setLessons,
  setFun,
  setStarred,
  rehydrateFilterState,
  setShowFilter,
} = createActions(
  {},
  ...[
    'SET_SORT',
    'SET_LESSONS',
    'SET_FUN',
    'SET_STARRED',
    'REHYDRATE_FILTER_STATE',
    'SET_SHOW_FILTER',
  ],
  {
    prefix: 'FILTER',
  }
);

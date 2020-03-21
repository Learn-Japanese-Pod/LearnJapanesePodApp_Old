import { handleActions } from 'redux-actions';
import { initialState } from './constants';
import {
  setFun,
  setLessons,
  setSort,
  setStarred,
  rehydrateFilterState,
  setShowFilter,
} from './actions';

export function rehydrateFilterStateReducer(state, action) {
  return {
    ...action.payload,
  };
}

export function setFunReducer(state, action) {
  return {
    ...state,
    fun: action.payload,
  };
}

export function setLessonsReducer(state, action) {
  return {
    ...state,
    lessons: action.payload,
  };
}

export function setStarredReducer(state, action) {
  return {
    ...state,
    starred: action.payload,
  };
}

export function setSortReducer(state, action) {
  return {
    ...state,
    sort: action.payload,
  };
}

export function setShowFilterReducer(state, action) {
  return {
    ...state,
    showFilter: action.payload,
  };
}

export const reducer = handleActions(
  {
    [rehydrateFilterState.toString()]: rehydrateFilterStateReducer,
    [setFun.toString()]: setFunReducer,
    [setLessons.toString()]: setLessonsReducer,
    [setSort.toString()]: setSortReducer,
    [setStarred.toString()]: setStarredReducer,
    [setShowFilter.toString()]: setShowFilterReducer,
  },
  initialState
);

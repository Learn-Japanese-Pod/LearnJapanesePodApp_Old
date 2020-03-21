import { GlobalState } from '../types';
import { RssState } from './types';

const getState = (state: GlobalState): RssState => state.rss;

export const isRefreshing = (state: GlobalState) => getState(state).refreshing;

export const selectMainFeed = (state: GlobalState) => getState(state).mainFeed;

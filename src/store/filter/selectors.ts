import { GlobalState } from '../types';
import { FilterState } from './types';

const getState = (state: GlobalState): FilterState => state.filter;

export const getFilter = (state: GlobalState) => getState(state);

export const getShowFilter = (state: GlobalState) => getState(state).showFilter;

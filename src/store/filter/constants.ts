import { FilterState, Sort } from './types';

export const initialState: FilterState = {
  fun: true,
  lessons: true,
  starred: true,
  sort: Sort.ASC,
  showFilter: false,
};

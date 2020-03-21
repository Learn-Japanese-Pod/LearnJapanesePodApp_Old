export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type FilterState = {
  fun: boolean;
  lessons: boolean;
  starred: boolean;
  sort: Sort;
  showFilter: boolean;
};

import { GlobalState } from '../types';
import { DetailsState, PodcastMeta } from './types';

const getState = (state: GlobalState): DetailsState => state.details;

export const getDetails = (state: GlobalState): Array<PodcastMeta> =>
  getState(state).podcasts;

export const getDetailsById = (state: GlobalState, id: string): PodcastMeta =>
  getState(state).podcasts.find(it => it.id === id);

export const getDownloadedById = (state: GlobalState, id: string) =>
  getState(state).podcasts.find(it => it.id === id).downloaded;

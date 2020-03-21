import { GlobalState } from '../types';
import { DownloadState } from './types';

const getState = (state: GlobalState): DownloadState => state.download;

export const isDownloadingById = (state: GlobalState, id: string) =>
  getState(state).downloadQueue.filter(it => it.id === id).length > 0;

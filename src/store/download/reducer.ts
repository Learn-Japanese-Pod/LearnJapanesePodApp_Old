import { handleActions } from 'redux-actions';
import { initialState } from './constants';
import { setDownloading, removeDownload } from './actions';

export function setDownloadingReducer(state, action) {
  const id = action.payload;
  const downloadQueue = state.downloadQueue;
  downloadQueue.push({
    id,
  });

  return {
    ...state,
    downloadQueue,
  };
}

export function removeDownloadReducer(state, action) {
  const id = action.payload;
  const downloadQueue = state.downloadQueue;
  const updatedQueue = downloadQueue.filter(it => it.id !== id);

  return {
    ...state,
    downloadQueue: updatedQueue,
  };
}

export const reducer = handleActions(
  {
    [setDownloading.toString()]: setDownloadingReducer,
    [removeDownload.toString()]: removeDownloadReducer,
  },
  initialState
);

import { createActions } from 'redux-actions';

export const { downloadItem, setDownloading, removeDownload } = createActions(
  {},
  ...['DOWNLOAD_ITEM', 'SET_DOWNLOADING', 'REMOVE_DOWNLOAD'],
  {
    prefix: 'DOWNLOAD',
  }
);

import { put, takeEvery, select } from 'redux-saga/effects';
import { downloadItem, setDownloading, removeDownload } from './actions';
import { setDownloaded } from '../details/actions';
import { persistData } from '../device/actions';
import { PodcastTypes } from '../rss/types';
import * as FileSystem from 'expo-file-system';
import { getConnected } from '../network/selectors';
import { Alert } from 'react-native';

function* downloadItemSaga(action) {
  const isConnected = yield select(getConnected);

  if (!isConnected) {
    Alert.alert(
      'No Network Detected',
      `Looks like you're offline, this feature is only available while you have a active internet connection.`,
      [{ text: 'OK', style: 'cancel' }],
      { cancelable: false }
    );
    return false;
  }

  const { id, type, url } = action.payload;

  yield put(setDownloading(id));

  const ext = type === PodcastTypes.PDF ? '.pdf' : '.mp3';
  const filename = `${id}${ext}`
    .toLowerCase()
    .replace(/ /g, '')
    .replace(/\//g, '_');

  const download = yield FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + 'downloads/' + filename
  );
  const { uri } = yield download.downloadAsync();
  yield put(removeDownload(id));
  yield put(
    setDownloaded({
      id,
      uri,
    })
  );
  yield put(persistData());
}

export function* saga() {
  yield takeEvery(downloadItem, downloadItemSaga);
}

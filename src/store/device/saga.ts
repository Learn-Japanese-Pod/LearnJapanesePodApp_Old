import { takeLatest, put, select, call } from 'redux-saga/effects';
import Constants from 'expo-constants';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { AsyncStorage } from 'react-native';
import {
  readDir,
  writeDir,
  deleteDir,
  initApp,
  setLoading,
  rehydrateDeviceState,
  persistData,
  deletePersistedData,
  getPushToken,
  setPushToken,
  deletePushToken,
  sendTestNotification,
} from './actions';
import { createNewPlayer } from '../player/actions';
import { rehydrateRssState, getMainFeed } from '../rss';
import { rehydrateDetailsState } from '../details/actions';
import { rehydrateFilterState } from '../filter/actions';
import { storeToken, deleteToken, sendTest } from './api';

function* initAppSaga() {
  const persistedDataStore = yield AsyncStorage.getItem('root');

  yield put(createNewPlayer());
  yield put(readDir());

  if (!persistedDataStore) {
    yield put(getMainFeed());
  } else {
    const { device, rss, details, filter } = JSON.parse(persistedDataStore);
    yield put(rehydrateDeviceState(device));
    yield put(rehydrateRssState(rss));
    yield put(rehydrateDetailsState(details));
    yield put(rehydrateFilterState(filter));
    yield put(getPushToken());
    yield put(setLoading(false));
  }
}

function* readDirSaga() {
  try {
    yield FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory + 'downloads'
    );
  } catch (e) {
    yield put(writeDir());
  }
}

function* writeDirSaga() {
  yield FileSystem.makeDirectoryAsync(
    FileSystem.documentDirectory + 'downloads'
  );
}

function* deleteDirSaga() {
  yield FileSystem.deleteAsync(FileSystem.documentDirectory + 'downloads');
}

function* persistDataSaga() {
  const state = yield select();
  const persist = {
    device: state.device,
    rss: state.rss,
    details: state.details,
    filter: state.filter,
  };

  yield AsyncStorage.setItem('root', JSON.stringify(persist));
}

function* deletePersistedDataSaga() {
  // TODO: Update details with downloaded: false;
  yield AsyncStorage.removeItem('root', null);
}

function* getPushTokenSaga() {
  if (!Constants.isDevice) {
    return;
  }
  const state = yield select();
  const hasStored = state.device.pushToken;
  const { status: askStatus } = yield call(
    Permissions.askAsync,
    Permissions.NOTIFICATIONS
  );
  const { status: deviceStatus } = yield call(
    Permissions.getAsync,
    Permissions.NOTIFICATIONS
  );

  console.log(askStatus, deviceStatus, hasStored);

  if (askStatus === 'denied' || deviceStatus === 'denied') {
    yield put(deletePushToken());
  } else if (
    (askStatus === 'granted' && !hasStored) ||
    (deviceStatus === 'granted' && !hasStored)
  ) {
    const token = yield call(Notifications.getExpoPushTokenAsync);
    yield call(storeToken, token);
    yield put(setPushToken(true));
    yield put(persistData());
  }
}

function* deletePushTokenSaga() {
  const token = yield call(Notifications.getExpoPushTokenAsync);
  yield call(deleteToken, token);
  yield put(setPushToken(false));
  yield put(persistData());
}

function* sendTestNotificationSaga() {
  if (Constants.isDevice) {
    const token = yield call(Notifications.getExpoPushTokenAsync);
    yield call(sendTest, token);
  }
}

export function* saga() {
  yield takeLatest(initApp, initAppSaga);
  yield takeLatest(readDir, readDirSaga);
  yield takeLatest(writeDir, writeDirSaga);
  yield takeLatest(deleteDir, deleteDirSaga);
  yield takeLatest(persistData, persistDataSaga);
  yield takeLatest(deletePersistedData, deletePersistedDataSaga);
  yield takeLatest(getPushToken, getPushTokenSaga);
  yield takeLatest(deletePushToken, deletePushTokenSaga);
  yield takeLatest(sendTestNotification, sendTestNotificationSaga);
}

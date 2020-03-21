import { takeLatest, put, select } from 'redux-saga/effects';
import { parseString } from 'react-native-xml2js';
import {
  getMainFeed,
  saveMainFeed,
  refreshMainFeed,
  setRefreshing,
} from './actions';
import { parseRss } from './parseRss';
import config from '../../config.json';
import { setPodcastDetails, updatePodcastDetails } from '../details/actions';
import { getPushToken, persistData, setLoading } from '../device/actions';
import { getConnected } from '../network/selectors';
import { Alert } from 'react-native';

function* refreshMainFeedSaga() {
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

  yield put(setRefreshing(true));

  const rss = yield fetch(config.mainFeedUrl).then(response => response.text());

  const promise = new Promise(resolve => {
    parseString(rss, (err, res) => {
      resolve({
        parsedRss: parseRss(res.rss.channel[0].item),
      });
    });
  });

  const { parsedRss } = yield promise;

  yield put(saveMainFeed(parsedRss));
  yield put(updatePodcastDetails(parsedRss));
  yield put(setRefreshing(false));
  yield put(persistData());
}

function* getMainFeedSaga() {
  const rss = yield fetch(config.mainFeedUrl).then(response => response.text());

  const promise = new Promise(resolve => {
    parseString(rss, (err, res) => {
      resolve({
        parsedRss: parseRss(res.rss.channel[0].item),
      });
    });
  });

  const { parsedRss } = yield promise;

  yield put(saveMainFeed(parsedRss));
  yield put(setPodcastDetails(parsedRss));
  yield put(persistData());
  yield put(getPushToken());
  yield put(setLoading(false));
}

export function* saga() {
  yield takeLatest(getMainFeed, getMainFeedSaga);
  yield takeLatest(refreshMainFeed, refreshMainFeedSaga);
}

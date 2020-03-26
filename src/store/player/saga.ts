import { takeLatest, put, select, takeLeading } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import {
  requestNewAudio,
  setPlayer,
  createNewPlayer,
  setStatus,
  pauseAudio,
  playAudio,
  setCurrentlyPlaying,
  toggleLoop,
  toggleMute,
  ffAudio,
  rwAudio,
  setFetching,
  jumpToAudio,
} from './actions';
import { getPlayer, getStatus, getFetching } from './selectors';
import { Audio } from 'expo-av';
import { getConnected } from '../network/selectors';
import { Alert } from 'react-native';
import { getDetailsById } from '../details';

const playerStatusChannel = channel();

function* playerStatusChannelSaga(status) {
  yield put(setStatus(status));
}

function* createNewPlayerSaga() {
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
  });

  const newPlayer = new Audio.Sound();

  newPlayer.setOnPlaybackStatusUpdate(status => {
    playerStatusChannel.put(status);
  });

  yield put(setPlayer(newPlayer));
}

function* requestNewAudioSaga(action) {
  const { url: requestedAudio, id, title } = action.payload;
  const player = yield select(getPlayer);
  const { downloaded } = yield select(getDetailsById, id);
  const fetching = yield select(getFetching);
  const status = yield player.getStatusAsync();
  const { isPlaying, uri: currentAudio } = status;

  const isConnected = yield select(getConnected);

  if (!isConnected && !downloaded) {
    Alert.alert(
      'No Network Detected',
      `Looks like you're offline, this feature is only available while you have a active internet connection.`,
      [{ text: 'OK', style: 'cancel' }],
      { cancelable: false }
    );
    return false;
  }

  if (currentAudio === requestedAudio || requestedAudio === fetching) return;

  yield put(setFetching(requestedAudio));

  yield put(
    setCurrentlyPlaying({
      id,
      title,
    })
  );

  try {
    if (isPlaying) yield player.pauseAsync();

    yield player.unloadAsync();

    yield player.loadAsync(
      {
        uri: requestedAudio,
      },
      { shouldPlay: true }
    );

    yield put(setFetching(null));
  } catch (e) {}
}

function* pauseAudioSaga() {
  const player = yield select(getPlayer);
  yield player.pauseAsync();
}

function* playAudioSaga() {
  const player = yield select(getPlayer);
  yield player.playAsync();
}

function* toggleLoopSaga() {
  const { isLooping } = yield select(getStatus);
  const player = yield select(getPlayer);
  yield player.setIsLoopingAsync(!isLooping);
}

function* toggleMuteSaga() {
  const { isMuted } = yield select(getStatus);
  const player = yield select(getPlayer);
  yield player.setIsMutedAsync(!isMuted);
}

function* ffAudioSaga() {
  const { positionMillis } = yield select(getStatus);
  const player = yield select(getPlayer);
  yield player.setPositionAsync(positionMillis + 30000);
}

function* rwAudioSaga() {
  const { positionMillis } = yield select(getStatus);
  const player = yield select(getPlayer);
  yield player.setPositionAsync(positionMillis - 30000);
}

function* jumpToAudioSaga(action) {
  const val = action.payload;
  const { durationMillis } = yield select(getStatus);
  const player = yield select(getPlayer);
  const calc = (val / 100) * durationMillis;
  yield player.setPositionAsync(calc);
}

export function* saga() {
  yield takeLatest(requestNewAudio, requestNewAudioSaga);
  yield takeLatest(createNewPlayer, createNewPlayerSaga);
  yield takeLatest(pauseAudio, pauseAudioSaga);
  yield takeLatest(playAudio, playAudioSaga);
  yield takeLatest(toggleLoop, toggleLoopSaga);
  yield takeLatest(toggleMute, toggleMuteSaga);
  yield takeLeading(ffAudio, ffAudioSaga);
  yield takeLeading(rwAudio, rwAudioSaga);
  yield takeLatest(jumpToAudio, jumpToAudioSaga);
  yield takeLatest(playerStatusChannel, playerStatusChannelSaga);
}

import { all, fork } from 'redux-saga/effects';
import { deviceSaga } from './device';
import { playerSaga } from './player';
import { rssSaga } from './rss';
import { detailsSaga } from './details';
import { filterSaga } from './filter';
import { downloadSaga } from './download';

export default function* rootSaga() {
  yield all([fork(deviceSaga)]);
  yield all([fork(playerSaga)]);
  yield all([fork(rssSaga)]);
  yield all([fork(detailsSaga)]);
  yield all([fork(filterSaga)]);
  yield all([fork(downloadSaga)]);
}

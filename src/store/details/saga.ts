import { put, takeLatest } from 'redux-saga/effects';
import { setStarred } from './actions';
import { persistData } from '../device/actions';

function* setStarredSaga() {
  yield put(persistData());
}

export function* saga() {
  yield takeLatest(setStarred, setStarredSaga);
}

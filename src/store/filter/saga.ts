import { put, takeLatest } from 'redux-saga/effects';
import {
  setFun,
  setLessons,
  setSort,
  setStarred,
  setShowFilter,
} from './actions';
import { persistData } from '../device/actions';

function* setFilterSaga() {
  yield put(persistData());
}

export function* saga() {
  yield takeLatest(
    [setFun, setLessons, setSort, setStarred, setShowFilter],
    setFilterSaga
  );
}

import {takeLatest } from 'redux-saga/effects';

import {ActionTypes} from '../common/constants';

export function* goBack(action) {
  try {
    yield action.payload();
  } catch (error) {
    console.error(error);
  }
}

export function* goTo(action) {
  try {
    yield action.payload.historyPush(action.payload.path);
  } catch (error) {
    console.error(error);
  }
}

export function* watchNavigation() {
  yield takeLatest(ActionTypes.GO_BACK, goBack);
  yield takeLatest(ActionTypes.GO_TO, goTo);
}

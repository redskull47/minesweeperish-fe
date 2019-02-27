import {all} from 'redux-saga/effects';

import {watchMinefield} from './minefield';

export default function* rootSaga() {
  yield all([
    watchMinefield()
  ]);
}
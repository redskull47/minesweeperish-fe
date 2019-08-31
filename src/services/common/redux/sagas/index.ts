import { all } from 'redux-saga/effects';

import { watchMinefield } from 'views/minesweeperView/redux/sagas/minefieldSaga';

export default function* rootSaga() {
  yield all([
    watchMinefield(),
  ]);
}
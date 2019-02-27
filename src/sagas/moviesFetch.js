import {call, put, takeEvery } from 'redux-saga/effects';

import serverApi from '../api/serverApi';
import {populateMovies} from '../actions/movies';
import {ActionTypes} from '../common/constants';

export function* fetchMovies(action) {
  try {
    const movies = yield call(serverApi.getMovies, action.payload);
    yield put(populateMovies(movies));
  } catch (error) {
    console.error(error);
  }
}

export function* watchMovies() {
  yield takeEvery(ActionTypes.FETCH_MOVIES, fetchMovies);
}
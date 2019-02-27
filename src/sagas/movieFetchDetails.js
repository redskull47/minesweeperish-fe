import {call, put, takeEvery } from 'redux-saga/effects';

import serverApi from '../api/serverApi';
import {populateMovieDetails} from '../actions/movieDetails';
import {ActionTypes} from '../common/constants';

export function* fetchMovieDetails(action) {
  try {
    const movie = yield call(serverApi.getMovies, action.payload);
    yield put(populateMovieDetails(movie));
  } catch (error) {
    console.error(error);
  }
}

export function* watchMovieDetails() {
  yield takeEvery(ActionTypes.FETCH_MOVIE_DETAILS, fetchMovieDetails);
}
import {call, put, takeLatest } from 'redux-saga/effects';

import serverApi from '../api/serverApi';
import {populateWikiData} from '../actions/wikiData';
import {ActionTypes} from '../common/constants';

export function* fetchWikiData(action) {
  try {
    const data = yield call(serverApi.getWikiData, action.payload);
    yield put(populateWikiData(data));
  } catch (error) {
    console.error(error);
  }
}

export function* watchWikiData() {
  yield takeLatest(ActionTypes.FETCH_WIKI_DATA, fetchWikiData);
}
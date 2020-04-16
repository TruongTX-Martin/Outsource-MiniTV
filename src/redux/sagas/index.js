import {all, takeLatest} from 'redux-saga/effects';
import {getListData} from './listDataSaga';
import * as Types from '../actions/types';

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    takeLatest(Types.GET_LISTDATA, getListData),
    //   takeLatest(types.SALON_RELEVANCE_GET, getSalonRelevance),
  ]);
}

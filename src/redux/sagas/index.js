import {all, takeLatest} from 'redux-saga/effects';
import {signUp, generateAccessToken} from './authSaga';
import * as Types from '../actions/types';

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    takeLatest(Types.SIGN_UP, signUp),
    takeLatest(Types.GENERATE_ACCESS_TOKEN, generateAccessToken),
    //   takeLatest(types.SALON_RELEVANCE_GET, getSalonRelevance),
  ]);
}

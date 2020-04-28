import {all, takeLatest} from 'redux-saga/effects';
import {
  signUp,
  generateAccessToken,
  signIn,
  findPassword,
  snsSignIn,
} from './authSaga';
import {getLiveMain, getListNotice, getListReplay, getDetail} from './liveSaga';
import {changePassword} from './myPageSaga';
import * as Types from '../actions/types';

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    takeLatest(Types.SIGN_UP, signUp),
    takeLatest(Types.GENERATE_ACCESS_TOKEN, generateAccessToken),
    takeLatest(Types.SIGN_IN, signIn),
    takeLatest(Types.FIND_PASSWORD, findPassword),
    takeLatest(Types.LIVE_MAIN_GET, getLiveMain),
    takeLatest(Types.NOTICE_GET, getListNotice),
    takeLatest(Types.REPLAY_GET, getListReplay),
    takeLatest(Types.DETAIL_GET, getDetail),
    takeLatest(Types.SNS_SIGNIN, snsSignIn),
    takeLatest(Types.CHANGE_PASSWORD, changePassword),
  ]);
}

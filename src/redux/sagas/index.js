import { all, takeLatest } from 'redux-saga/effects';
import {
  signUp,
  generateAccessToken,
  signIn,
  findPassword,
  snsSignIn,
  updatePushAlert,
} from './authSaga';
import {
  getLiveMain,
  getListNotice,
  getListReplay,
  getDetail,
  pokeChannel,
  getPokeList,
} from './liveSaga';
import {
  changePassword,
  getMe,
  updateProfile,
  updateProfileImage,
  deleteAccount,
} from './myPageSaga';
import {
  getListChannel,
  getChannelDetail,
  pokeChannel as pokeChannel2,
} from './channelSaga';
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
    takeLatest(Types.GET_ME, getMe),
    takeLatest(Types.UPDATE_PROFILE, updateProfile),
    takeLatest(Types.UPDATE_IMAGE_PROFILE, updateProfileImage),
    takeLatest(Types.DELETE_ACCOUNT, deleteAccount),
    takeLatest(Types.POKE_CHANNEL, pokeChannel),
    takeLatest(Types.POKE_LIST_GET, getPokeList),
    takeLatest(Types.CHANNEL_LIST_GET, getListChannel),
    takeLatest(Types.CHANNEL_DETAIL_GET, getChannelDetail),
    takeLatest(Types.POKE_CHANNEL_2, pokeChannel2),
    takeLatest(Types.UPDATE_PUSH_ALERT, updatePushAlert),
  ]);
}

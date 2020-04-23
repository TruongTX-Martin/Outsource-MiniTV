import * as authActions from '../actions/authActions';
import {put} from 'redux-saga/effects';
import DataRemote from '../../services/DataRemote';
import DataLocal from '../../services/DataLocal';

export function* signUp(action) {
  try {
    yield put(authActions.signUpStart());
    const signUpResult = yield DataRemote.signUp(action.params);
    if (signUpResult.status == 200) {
      yield put(authActions.signUpSuccess());
    } else {
      yield put(authActions.signUpFailed());
    }
  } catch (error) {
    yield put(authActions.signUpFailed());
  }
}

export function* generateAccessToken() {
  try {
    const generateResult = yield DataRemote.generateAccessToken();
    if (generateResult.status == 200) {
      DataLocal.setAccessToken(generateResult.data.access_token);
    }
  } catch (error) {}
}

export function* signIn(action) {
  try {
    yield put(authActions.signInStart());
    const signInResult = yield DataRemote.signIn(action.params);
    if (signInResult.status == 200) {
      DataLocal.setUserToken(signInResult.data.user_token);
      yield put(authActions.signInSuccess());
    }
  } catch (error) {
    yield put(authActions.signInFailed());
  }
}

export function* findPassword(action) {
  try {
    yield put(authActions.findPasswordStart());
    const findPasswordResult = yield DataRemote.findPassword(action.email);
    if (findPasswordResult.status == 200) {
      yield put(authActions.findPasswordSuccess());
    }
  } catch (error) {
    yield put(authActions.findPasswordFailed());
  }
}
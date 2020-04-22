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
    console.log('Sign in saga:', action);
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

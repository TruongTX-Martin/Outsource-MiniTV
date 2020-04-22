import * as authActions from '../actions/authActions';
import {put} from 'redux-saga/effects';
import DataRemote from '../../services/DataRemote';
import DataLocal from '../../services/DataLocal';

export function* signUp(action) {
  try {
    console.log('Sign up saga:', action);
    yield put(authActions.signUpStart());
    const signUpResult = yield DataRemote.signUp(action.params);
    if (signUpResult.status == 200) {
      yield put(authActions.singUpSuccess());
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

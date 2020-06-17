import * as authActions from '../actions/authActions';
import { put } from 'redux-saga/effects';
import DataRemote from '../../services/DataRemote';
import DataLocal from '../../services/DataLocal';
import { EventRegister } from 'react-native-event-listeners';
import Constants from '../../config/Constant';

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
    yield put(authActions.generateAccessTokenStart());
    const generateResult = yield DataRemote.generateAccessToken();
    if (generateResult.status == 200) {
      DataLocal.setAccessToken(generateResult.data.access_token);
      EventRegister.emit(
        Constants.EVENT_GOTO_STORE,
        generateResult.data.force_update,
      );
      yield put(authActions.generateAccessTokenSuccess(generateResult.data));
    } else {
      yield put(authActions.generateAccessTokenFailed());
    }
  } catch (error) {
    yield put(authActions.generateAccessTokenFailed());
  }
}

export function* signIn(action) {
  try {
    yield put(authActions.signInStart());
    const signInResult = yield DataRemote.signIn(action.params);
    if (signInResult.status == 200) {
      DataLocal.setUserToken(signInResult.data.user_token);
      yield put(authActions.signInSuccess());
    } else {
      yield put(authActions.signInFailed());
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
    } else {
      yield put(authActions.findPasswordFailed());
    }
  } catch (error) {
    yield put(authActions.findPasswordFailed());
  }
}

export function* snsSignIn(action) {
  try {
    yield put(authActions.snsSignInStart());
    const results = yield DataRemote.snsSignIn(action.params);
    if (results && results.status == 200) {
      DataLocal.setUserToken(results.data.user_token);
      yield put(authActions.snsSignInSuccess());
    } else {
      yield put(authActions.snsSignInFailed());
    }
  } catch (error) {
    yield put(authActions.snsSignInFailed());
  }
}

export function* updatePushAlert(action) {
  try {
    yield DataRemote.updatePushAlert({
      available: action.available,
    });
  } catch (error) { }
}

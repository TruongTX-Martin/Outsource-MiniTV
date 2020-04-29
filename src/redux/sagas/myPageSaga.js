import * as myPageAction from '../actions/myPageActions';
import {put} from 'redux-saga/effects';
import DataRemote from '../../services/DataRemote';
import DataLocal from '../../services/DataLocal';

export function* changePassword(action) {
  try {
    console.log('Changepasswordsaaga', action);
    yield put(myPageAction.changePasswordStart());
    const results = yield DataRemote.changePassword(action.params);
    console.log('Result:', results);
    // if (signUpResult.status == 200) {
    //   yield put(authActions.signUpSuccess());
    // } else {
    //   yield put(authActions.signUpFailed());
    // }
  } catch (error) {
    console.log('Error:', error);
    // yield put(authActions.signUpFailed());
  }
}

export function* getMe() {
  try {
    yield put(myPageAction.getMeStart());
    const results = yield DataRemote.getMe();
    console.log('Result:', results);
    if (results.status == 200) {
      yield put(myPageAction.getMeSuccess(results.data));
    } else {
      yield put(myPageAction.getMeFailed());
    }
  } catch (error) {
    yield put(myPageAction.getMeFailed());
  }
}

export function* updateProfile(action) {
  try {
    console.log('updateProfile saga', action);
    yield put(myPageAction.updateProfileStart());
    const results = yield DataRemote.updateProfile(action.params);
    console.log('Result:', results);
    if (results.status == 200) {
      yield put(myPageAction.updateProfileSuccess());
    } else {
      yield put(myPageAction.updateProfileFailed());
    }
  } catch (error) {
    yield put(myPageAction.updateProfileFailed());
  }
}

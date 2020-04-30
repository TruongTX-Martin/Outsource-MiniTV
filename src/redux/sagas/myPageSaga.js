import * as myPageAction from '../actions/myPageActions';
import {put} from 'redux-saga/effects';
import DataRemote from '../../services/DataRemote';

export function* changePassword(action) {
  try {
    yield put(myPageAction.changePasswordStart());
    const results = yield DataRemote.changePassword(action.params);
    if (results.status == 200) {
      yield put(myPageAction.changePasswordSuccess());
    } else {
      yield put(myPageAction.changePasswordFailed());
    }
  } catch (error) {
    yield put(myPageAction.changePasswordFailed());
  }
}

export function* getMe() {
  try {
    yield put(myPageAction.getMeStart());
    const results = yield DataRemote.getMe();
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
    yield put(myPageAction.updateProfileStart());
    const results = yield DataRemote.updateProfile(action.params);
    if (results.status == 200) {
      yield put(myPageAction.updateProfileSuccess());
    } else {
      yield put(myPageAction.updateProfileFailed());
    }
  } catch (error) {
    yield put(myPageAction.updateProfileFailed());
  }
}

export function* updateProfileImage(action) {
  try {
    yield put(myPageAction.updateImageProfileStart());
    const results = yield DataRemote.updateProfileImage(action.params);
    if (results.data) {
      yield put(myPageAction.updateImageProfileSuccess());
    } else {
      yield put(myPageAction.updateImageProfileFailed());
    }
  } catch (error) {
    yield put(myPageAction.updateImageProfileFailed());
  }
}

export function* deleteAccount(action) {
  try {
    yield put(myPageAction.deleteAccountStart());
    const results = yield DataRemote.deleteAccount(action.params);
    if (results.status == 200) {
      yield put(myPageAction.deleteAccountSuccess());
    } else {
      yield put(myPageAction.deleteAccountFailed());
    }
  } catch (error) {
    yield put(myPageAction.deleteAccountFailed());
  }
}

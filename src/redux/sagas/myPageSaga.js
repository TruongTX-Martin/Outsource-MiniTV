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

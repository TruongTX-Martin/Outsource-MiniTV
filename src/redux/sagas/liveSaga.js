import * as liveActions from '../actions/liveActions';
import {put} from 'redux-saga/effects';
import DataRemote from '../../services/DataRemote';
import DataLocal from '../../services/DataLocal';

export function* getLiveMain(action) {
  try {
    console.log('Saga getLiveMain:', action);
    yield put(liveActions.liveMainStart());
    const mainResult = yield DataRemote.getMainLive();
    console.log('mainResult:', mainResult);
    if (mainResult.status == 200) {
      yield put(liveActions.liveMainSuccess(mainResult.data));
    } else {
      yield put(liveActions.liveMainFailed());
    }
  } catch (error) {
    yield put(liveActions.liveMainFailed());
  }
}

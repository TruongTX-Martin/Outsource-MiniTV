import * as getListDataAction from '../actions/getListDataAction';
import {put} from 'redux-saga/effects';
import DataRemote from '../../services/DataRemote';

export function* getListData() {
  try {
    yield put(getListDataAction.getListDataStart());
    const data = yield DataRemote.getListData();
    if (data.status == 200) {
      yield put(getListDataAction.getListDataSuccess({list: data.data}));
    } else {
      yield put(getListDataAction.getListDataFailed());
    }
  } catch (error) {}
}

import * as liveActions from '../actions/liveActions';
import { put } from 'redux-saga/effects';
import DataRemote from '../../services/DataRemote';
import * as channelActions from '../actions/channelActions';
export function* getListChannel(action) {
  try {
    yield put(liveActions.channelListStart());
    const mainResult = yield DataRemote.getChannelList();
    if (mainResult.status == 200) {
      yield put(liveActions.channelListSuccess(mainResult.data));
    } else {
      yield put(liveActions.channelListFailed());
    }
  } catch (error) {
    yield put(liveActions.channelListFailed());
  }
}

export function* getChannelDetail(action) {
  try {
    yield put(liveActions.channelDetailStart());
    const results = yield DataRemote.getChannelDetail(action.id);
    if (results.status == 200) {
      yield put(liveActions.channelDetailSuccess(results.data));
    } else {
      yield put(liveActions.channelDetailFailed());
    }
  } catch (error) {
    yield put(liveActions.channelDetailFailed());
  }
}

export function* pokeChannel(action) {
  try {
    console.log('Poke channel 2 saga:', action);
    yield put(channelActions.pokeChannelStart2(action.params));
    const result = yield DataRemote.pokeChannel2(action.liveId, action.params);
    if (result.status == 200) {
      yield put(channelActions.pokeChannelSuccess2());
      yield put(liveActions.channelDetailGet(action.liveIdRefresh));
    } else {
      yield put(channelActions.pokeChannelFailed2());
    }
  } catch (error) {
    yield put(channelActions.pokeChannelFailed2());
  }
}

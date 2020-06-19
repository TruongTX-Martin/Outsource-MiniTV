import * as liveActions from '../actions/liveActions';
import { put } from 'redux-saga/effects';
import DataRemote from '../../services/DataRemote';
import DataLocal from '../../services/DataLocal';

export function* getLiveMain(action) {
  try {
    yield put(liveActions.liveMainStart());
    const mainResult = yield DataRemote.getMainLive();
    if (mainResult.status == 200) {
      if (mainResult?.data?.on_air?.status == 'DOING') {
        const resultPlay = yield DataRemote.getPlayUrl(
          mainResult?.data?.on_air?.live_uid,
        );
        yield put(
          liveActions.liveMainSuccess(mainResult.data, resultPlay?.data),
        );
      } else {
        yield put(liveActions.liveMainSuccess(mainResult.data, null));
      }
    } else {
      yield put(liveActions.liveMainFailed());
    }
  } catch (error) {
    yield put(liveActions.liveMainFailed());
  }
}

export function* getListNotice(action) {
  try {
    yield put(liveActions.noticeStart());
    const result = yield DataRemote.getListNotice();
    if (result.status == 200) {
      yield put(liveActions.noticeSuccess(result.data));
    } else {
      yield put(liveActions.noticeFailed());
    }
  } catch (error) {
    yield put(liveActions.noticeFailed());
  }
}

export function* getListReplay(action) {
  try {
    yield put(liveActions.replayStart());
    const result = yield DataRemote.getListReplay();
    if (result.status == 200) {
      yield put(liveActions.replaySuccess(result.data));
    } else {
      yield put(liveActions.replayFailed());
    }
  } catch (error) {
    yield put(liveActions.replayFailed());
  }
}

export function* getDetail(action) {
  try {
    yield put(liveActions.detailStart());
    const result = yield DataRemote.getDetail(action.id);
    if (result.status == 200) {
      yield put(liveActions.detailSuccess(result.data));
    }
  } catch (error) {
    yield put(liveActions.detailFailed());
  }
}

export function* pokeChannel(action) {
  try {
    yield put(liveActions.pokeChannelStart(action.params));
    const result = yield DataRemote.pokeChannel(action.liveId, action.params);
    if (result.status == 200) {
      yield put(liveActions.pokeChannelSuccess());
      yield put(liveActions.liveMainGet());
      yield put(liveActions.getPokeList());
    } else {
      yield put(liveActions.pokeChannelFailed());
    }
  } catch (error) {
    yield put(liveActions.pokeChannelFailed());
  }
}

export function* getPokeList(action) {
  try {
    yield put(liveActions.getPokeListStart());
    const result = yield DataRemote.getPokeList();
    if (result.status == 200) {
      yield put(liveActions.getPokeListSuccess(result.data));
    } else {
      yield put(liveActions.getPokeListFailed());
    }
  } catch (error) {
    yield put(liveActions.getPokeListFailed());
  }
}

import * as Types from './types';

//sign up
export function liveMainGet() {
  return {
    type: Types.LIVE_MAIN_GET,
  };
}

export function liveMainStart() {
  return {
    type: Types.LIVE_MAIN_START,
  };
}

export function liveMainSuccess(data, resultPlay) {
  return {
    type: Types.LIVE_MAIN_SUCCESS,
    data,
    resultPlay,
  };
}

export function liveMainFailed() {
  return {
    type: Types.LIVE_MAIN_FAILED,
  };
}

//notice
export function noticeGet() {
  return {
    type: Types.NOTICE_GET,
  };
}

export function noticeStart() {
  return {
    type: Types.NOTICE_START,
  };
}
export function noticeClear() {
  return {
    type: Types.NOTICE_CLEAR,
  };
}

export function noticeSuccess(list) {
  return {
    type: Types.NOTICE_SUCCESS,
    list,
  };
}

export function noticeFailed() {
  return {
    type: Types.NOTICE_FAILED,
  };
}

//poke list
export function getPokeList() {
  return {
    type: Types.POKE_LIST_GET,
  };
}

export function clearPokeList() {
  return {
    type: Types.POKE_LIST_CLEAR,
  };
}

export function getPokeListStart() {
  return {
    type: Types.POKE_LIST_START,
  };
}

export function getPokeListSuccess(list) {
  return {
    type: Types.POKE_LIST_SUCCESS,
    list,
  };
}

export function getPokeListFailed() {
  return {
    type: Types.POKE_LIST_FAILED,
  };
}

//replay
export function replayGet() {
  return {
    type: Types.REPLAY_GET,
  };
}

export function replayStart() {
  return {
    type: Types.REPLAY_START,
  };
}
export function replayClear() {
  return {
    type: Types.REPLAY_CLEAR,
  };
}

export function replaySuccess(list) {
  return {
    type: Types.REPLAY_SUCCESS,
    list,
  };
}

export function replayFailed() {
  return {
    type: Types.REPLAY_FAILED,
  };
}

//detail
export function detailGet(id) {
  return {
    type: Types.DETAIL_GET,
    id,
  };
}

export function detailClear() {
  return {
    type: Types.DETAIL_CLEAR,
  };
}

export function detailStart() {
  return {
    type: Types.DETAIL_START,
  };
}

export function detailSuccess(detail) {
  return {
    type: Types.DETAIL_SUCCESS,
    detail,
  };
}
export function detailFailed() {
  return {
    type: Types.DETAIL_FAILED,
  };
}

//poke channel
export function pokeChannel(liveId, params) {
  return {
    type: Types.POKE_CHANNEL,
    liveId,
    params,
  };
}
export function pokeChannelClear() {
  return {
    type: Types.POKE_CHANNEL_CLEAR,
  };
}

export function pokeChannelStart(params) {
  return {
    type: Types.POKE_CHANNEL_START,
    params,
  };
}

export function pokeChannelSuccess() {
  return {
    type: Types.POKE_CHANNEL_SUCCESS,
  };
}

export function pokeChannelFailed() {
  return {
    type: Types.POKE_CHANNEL_FAILED,
  };
}

//channel list
export function channelListGet() {
  return {
    type: Types.CHANNEL_LIST_GET,
  };
}
export function channelListClear() {
  return {
    type: Types.CHANNEL_LIST_CLEAR,
  };
}
export function channelListStart() {
  return {
    type: Types.CHANNEL_LIST_START,
  };
}
export function channelListSuccess(list) {
  return {
    type: Types.CHANNEL_LIST_SUCCESS,
    list,
  };
}

export function channelListFailed() {
  return {
    type: Types.CHANNEL_LIST_FAILED,
  };
}

//channel detail
export function channelDetailGet(id) {
  return {
    type: Types.CHANNEL_DETAIL_GET,
    id,
  };
}
export function channelDetailClear() {
  return {
    type: Types.CHANNEL_DETAIL_CLEAR,
  };
}

export function channelDetailStart() {
  return {
    type: Types.CHANNEL_DETAIL_START,
  };
}
export function channelDetailSuccess(detail) {
  return {
    type: Types.CHANNEL_DETAIL_SUCCESS,
    detail,
  };
}
export function channelDetailFailed() {
  return {
    type: Types.CHANNEL_DETAIL_FAILED,
  };
}

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

export function liveMainSuccess(data) {
  return {
    type: Types.LIVE_MAIN_SUCCESS,
    data,
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

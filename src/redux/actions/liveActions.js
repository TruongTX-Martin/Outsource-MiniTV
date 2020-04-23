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

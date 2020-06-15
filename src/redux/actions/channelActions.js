import * as Types from './types';

//poke channel
export function pokeChannel2(liveId, liveIdRefresh, params) {
  return {
    type: Types.POKE_CHANNEL_2,
    liveId,
    liveIdRefresh,
    params,
  };
}
export function pokeChannelClear2() {
  return {
    type: Types.POKE_CHANNEL_CLEAR_2,
  };
}

export function pokeChannelStart2(params) {
  return {
    type: Types.POKE_CHANNEL_START_2,
    params,
  };
}

export function pokeChannelSuccess2() {
  return {
    type: Types.POKE_CHANNEL_SUCCESS_2,
  };
}

export function pokeChannelFailed2() {
  return {
    type: Types.POKE_CHANNEL_FAILED_2,
  };
}

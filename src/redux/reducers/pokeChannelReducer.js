import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  isSuccess: false,
  loading: false,
};

const pokeChannelReducer = createReducer(initialState, {
  [Types.POKE_CHANNEL_START](state) {
    return {
      ...state,
      loading: true,
      isSuccess: false,
    };
  },
  [Types.POKE_CHANNEL_SUCCESS](state, action) {
    return {
      ...state,
      isSuccess: true,
      loading: false,
    };
  },
  [Types.POKE_CHANNEL_FAILED](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
    };
  },
  [Types.POKE_CHANNEL_CLEAR](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
    };
  },
});
export default pokeChannelReducer;

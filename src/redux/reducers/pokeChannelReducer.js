import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  pokeAvailabe: false,
  isSuccess: false,
  loading: false,
};

const pokeChannelReducer = createReducer(initialState, {
  [Types.POKE_CHANNEL_START](state, action) {
    return {
      ...state,
      loading: true,
      isSuccess: false,
      pokeAvailabe: action.params.available,
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
      pokeAvailabe: false,
    };
  },
});
export default pokeChannelReducer;

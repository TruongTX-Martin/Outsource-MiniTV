import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  loading: false,
  list: [],
};

const liveReplayGetReducer = createReducer(initialState, {
  [Types.REPLAY_START](state) {
    return {
      ...state,
      loading: true,
    };
  },
  [Types.REPLAY_SUCCESS](state, action) {
    return {
      ...state,
      loading: false,
      list: action.list,
    };
  },
  [Types.REPLAY_FAILED](state, action) {
    return {
      ...state,
      loading: false,
    };
  },
  [Types.REPLAY_CLEAR](state, action) {
    return {
      ...state,
      loading: null,
      list: [],
    };
  },
});
export default liveReplayGetReducer;

import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  isSuccess: false,
  loading: false,
  list: [],
};

const channelGetListReducer = createReducer(initialState, {
  [Types.CHANNEL_LIST_START](state) {
    return {
      ...state,
      loading: true,
      isSuccess: false,
    };
  },
  [Types.CHANNEL_LIST_SUCCESS](state, action) {
    return {
      ...state,
      isSuccess: true,
      loading: false,
      list: action.list
    };
  },
  [Types.CHANNEL_LIST_FAILED](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
    };
  },
  [Types.CHANNEL_LIST_CLEAR](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
      list: [],
    };
  },
});
export default channelGetListReducer;

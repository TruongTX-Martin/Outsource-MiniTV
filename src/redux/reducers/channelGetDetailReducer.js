import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  isSuccess: false,
  loading: false,
  detail: null,
};

const channelGetDetailReducer = createReducer(initialState, {
  [Types.CHANNEL_DETAIL_START](state) {
    return {
      ...state,
      loading: true,
      isSuccess: false,
    };
  },
  [Types.CHANNEL_DETAIL_SUCCESS](state, action) {
    return {
      ...state,
      isSuccess: true,
      loading: false,
      detail: action.detail
    };
  },
  [Types.CHANNEL_DETAIL_FAILED](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
    };
  },
  [Types.CHANNEL_DETAIL_CLEAR](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
      detail: null
    };
  },
});
export default channelGetDetailReducer;

import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  loading: false,
  detail: null,
};

const liveDetailReducer = createReducer(initialState, {
  [Types.DETAIL_START](state) {
    return {
      ...state,
      loading: true,
    };
  },
  [Types.DETAIL_SUCCESS](state, action) {
    return {
      ...state,
      loading: false,
      detail: action.detail,
    };
  },
  [Types.DETAIL_FAILED](state, action) {
    return {
      ...state,
      loading: false,
    };
  },
  [Types.DETAIL_CLEAR](state, action) {
    return {
      ...state,
      loading: false,
      detail: null,
    };
  },
});
export default liveDetailReducer;

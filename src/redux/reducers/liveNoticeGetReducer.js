import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  loading: false,
  listNotice: [],
};

const liveNoticeGetReducer = createReducer(initialState, {
  [Types.NOTICE_START](state) {
    return {
      ...state,
      loading: true,
    };
  },
  [Types.NOTICE_SUCCESS](state, action) {
    return {
      ...state,
      loading: false,
      listNotice: action.list,
    };
  },
  [Types.NOTICE_FAILED](state, action) {
    return {
      ...state,
      loading: false,
    };
  },
  [Types.NOTICE_CLEAR](state, action) {
    return {
      ...state,
      loading: null,
      listNotice: [],
    };
  },
});
export default liveNoticeGetReducer;

import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  isSuccess: false,
  loading: false,
  reason: null,
};

const changePasswordReducer = createReducer(initialState, {
  [Types.CHANGE_PASSWORD_START](state) {
    return {
      ...state,
      loading: true,
      isSuccess: false,
      reason: null,
    };
  },
  [Types.CHANGE_PASSWORD_SUCCESS](state, action) {
    return {
      ...state,
      isSuccess: true,
      loading: false,
      reason: null,
    };
  },
  [Types.CHANGE_PASSWORD_FAILED](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
      reason: 'Change password failed',
    };
  },
  [Types.CHANGE_PASSWORD_CLEAR](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
      reason: null,
    };
  },
});
export default changePasswordReducer;

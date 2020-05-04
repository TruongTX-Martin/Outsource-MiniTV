import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  isSuccess: false,
  loading: false,
  reason: null,
};

const signInReducer = createReducer(initialState, {
  [Types.SIGN_IN_START](state) {
    return {
      ...state,
      loading: true,
      isSuccess: false,
      reason: null,
    };
  },
  [Types.SIGN_IN_SUCCESS](state, action) {
    return {
      ...state,
      isSuccess: true,
      loading: false,
      reason: null,
    };
  },
  [Types.SIGN_IN_FAILED](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
      reason: '이메일 주소 또는 비밀번호가 잘못 입력되었습니다. ',
    };
  },
  [Types.SIGN_IN_CLEAR](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
      reason: null,
    };
  },
});
export default signInReducer;

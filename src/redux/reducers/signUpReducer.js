import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  isSuccess: false,
  loading: false,
  reason: null,
};

const signUpReducer = createReducer(initialState, {
  [Types.SIGN_UP_START](state) {
    return {
      ...state,
      loading: true,
      isSuccess: false,
      reason: null,
    };
  },
  [Types.SIGN_UP_FAILED](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
      reason: 'Sign up error, please try to use another email',
    };
  },
  [Types.SIGN_UP_SUCCESS](state, action) {
    return {
      ...state,
      isSuccess: true,
      loading: false,
      reason: null,
    };
  },

  [Types.SIGN_UP_CLEAR](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
      reason: null,
    };
  },
});
export default signUpReducer;

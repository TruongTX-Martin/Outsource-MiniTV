import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  snsSuccess: false,
  snsLoading: false,
  snsMessage: null,
};

const snsSignInReducer = createReducer(initialState, {
  [Types.SNS_SIGNIN_START](state) {
    return {
      ...state,
      snsLoading: true,
      snsSuccess: false,
      snsMessage: null,
    };
  },
  [Types.SNS_SIGNIN_SUCCESS](state, action) {
    return {
      ...state,
      snsLoading: false,
      snsSuccess: true,
      snsMessage: null,
    };
  },
  [Types.SNS_SIGNIN_FAILED](state, action) {
    return {
      ...state,
      snsLoading: false,
      snsSuccess: false,
      snsMessage: 'failed',
    };
  },
  [Types.SNS_SIGNIN_CLEAR](state, action) {
    return {
      ...state,
      snsLoading: false,
      snsSuccess: false,
      snsMessage: null,
    };
  },
});
export default snsSignInReducer;
